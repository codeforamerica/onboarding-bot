import GraphHTTP from 'express-graphql';
import Schema from './graphql/schema';

const path = require('path');
const os = require('os');
const querystring = require('querystring');
const _ = require('lodash');
const Botkit = require('botkit');

const pg = require('pg').native;
var botResponse = require('./response');
var config;
try {
  config = require('../config.json');
} catch (e) {
  console.warn('Could not find local config.json, assumming production environment.\n');
  config = {'settings':{'prod':{'debug':'false','db':process.env.DATABASE_URL},'dev':{'debug':'false','db':process.env.DATABASE_URL}},'authentication_prod':{'token':process.env.SLACK},'authentication_dev':{'token':process.env.SLACK}};
}
var connectionString = process.env.DEV ? config.settings.dev.db : config.settings.prod.db;

// Our configuration and initialization for botkit
var setup = process.env.DEV ? config.settings.dev : config.settings.prod;
var controller = Botkit.slackbot(setup);
var authentication = process.env.DEV ? config.authentication_dev : config.authentication_prod;
controller.spawn(authentication).startRTM();

// Setup our express server, for serving front-end interface
const express = require('express');
const bodyParser = require('body-parser');
var server = express();
server.use(bodyParser.json()); // for parsing application/json
server.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
var port = process.env.PORT || 8000;
var dir = path.join(__dirname, '/../public');
server.use(express.static(dir));

// Connect to our Postges database
pg.connect(connectionString, function(err, client) {
    if (err) console.warn('ERROR 🚫:\n', err);

    // Modes of interaction
    var modes = ['direct_mention', 'direct_message', 'channel_joined', 'channel_leave'];

    // Set-up bot's handlers
    controller.on(modes, function(bot, message) {
      botResponse(message.text, client, bot, message);
    });

    controller.hears(['uptime', 'identify yourself', 'who are you', 'what is your name'],
    'direct_message,direct_mention,mention', function(bot, message) {
        bot.reply(message, ':robot_face: I am <@' + bot.identity.name +'> and have been running for ' + process.uptime() + ' seconds on ' + os.hostname() + '. Visit my user-interface at http://c4a.me/onboarding');
    });

    // Routes for our frontend-bot interface
    // GET /gimme returns item of choice, with limit specifications
    server.get('/gimme/:field', function(req, res) {
      // Request for some :field in the database
      var limit = req.query.limit || 10;
      var command = `SELECT * FROM ${querystring.escape(req.params.field)} LIMIT ${querystring.escape(limit)};`;
      // Get item specified with given command
      client.query(command, null, function(err, result) {
        res.json(result.rows);
      });
    });


    server.use('/graphql', GraphHTTP({
      schema: Schema,
      pretty: true,
      graphiql: true
    }));

    // Routes for writing to the database, via HTTP POST
    server.post('/take/:field', function(req, res) {
      var body = req.body;
      var fields = fieldsfor(req.params.field);
      var fields_formatted = fields.map(function(words) {
        return words.substring(0,1).toUpperCase() + words.substring(1, words.length).toLowerCase();
      });
      var id_key = req.params.field + '_id';

      var commandPull = `SELECT * FROM ${querystring.escape(req.params.field)} WHERE (${id_key} = ${querystring.escape(body[id_key])});`;

      // We ask for infomation user is trying to update
      client.query(commandPull, null, function(err, result) {
        if (err) console.warn(err);
        var template = result.rows[0];
        console.log(_.assign(template, body));
        var values = Object.keys(_.assign(template, body)).map(function(datum) { return body[datum] }).join(',');
        console.log('VALUES', values);
        var commandPush = `UPDATE ${querystring.escape(req.params.field)} (${fields}) VALUES (${values}) WHERE (${querystring.escape(id_key)} = ${querystring.escape(body[id_key])});`;
        res.send(commandPush);
      });

    });

    server.listen(port, function() {
      console.log('Listening on given http://localhost:' + port);
    });

    // Export for testing
    module.exports = controller;
});

function fieldsfor(field) {
  switch (field) {
    case 'members':
      var words = ['members_id', 'members_name', 'members_descript', 'last_message_id'];
      return words;
      break;
    case 'messages':
      var words = ['messages_id', 'messages_text', 'receivers_id', 'receivers_name', 'time_to_post', 'senders_id', 'senders_name'];
      return words;
      break;
    case 'resources':
      var words = ['resources_id', 'resources_title', 'resources_keywords', 'resources_link'];
      return words;
      break;
    default:
      return ['NULL'];
      break;
  }
}
