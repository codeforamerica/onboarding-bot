import GraphHTTP from 'express-graphql';
import Schema from './graphql/schema';

const path = require('path');
const os = require('os');
const querystring = require('querystring');
const _ = require('lodash');
const Botkit = require('botkit');
const pg = require('pg').native;

let botResponse = require('./response');
let config;
try {
  config = require('../config.json');
} catch (e) {
  console.warn('Could not find local config.json, assumming production environment.\n');
  config = {'settings':{'prod':{'debug':'false','db':process.env.DATABASE_URL},'dev':{'debug':'false','db':process.env.DATABASE_URL}},'authentication_prod':{'token':process.env.SLACK},'authentication_dev':{'token':process.env.SLACK}};
}
let connectionString = process.env.DEV ? config.settings.dev.db : config.settings.prod.db;

// Our configuration and initialization for botkit
let setup = process.env.DEV ? config.settings.dev : config.settings.prod;
console.log('******** CONFIG', JSON.stringify(setup, null, '\t'));
let controller = Botkit.slackbot(setup);
debugger;
let authentication = process.env.DEV ? config.authentication_dev : config.authentication_prod;
controller.spawn(authentication).startRTM();

// Setup our express server, for serving front-end interface
const express = require('express');
const bodyParser = require('body-parser');
let server = express();
server.use(bodyParser.json()); // for parsing application/json
server.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
let port = process.env.PORT || 8000;
let dir = path.join(__dirname, '/../public');

// Set up our front-end API
server.use(express.static(dir));

// Connect to our Postgres database
pg.connect(connectionString, function(err, client) {
    if (err) console.warn('ERROR 🚫:\n', err);

    // Modes of interaction
    let modes = ['direct_mention', 'direct_message', 'channel_joined', 'channel_leave'];

    // Set-up bot's handlers
    controller.on(modes, function(bot, message) {
      botResponse(message.text, client, bot, message);
    });

    controller.hears(['uptime', 'identify yourself', 'who are you', 'what is your name'],
    'direct_message,direct_mention,mention', function(bot, message) {
        bot.reply(message, ':robot_face: I am <@' + bot.identity.name +'> and have been running for ' + process.uptime() + ' seconds on ' + os.hostname() + '. Visit my user-interface at http://c4a.me/onboarding');
    });

    // Our graphql server API
    server.use('/gateway', GraphHTTP({
      schema: Schema,
      pretty: true,
      graphiql: process.env.DEV
    }));

    server.listen(port, function() {
      console.log('Listening on given http://localhost:' + port);
    });

    // Export for testing
    module.exports = controller;
});
