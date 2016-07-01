var path = require('path');
var os = require('os');

var Botkit = require('botkit');
var botResponse = require('./response');
var pg = require('pg').native;
var config;
try {
  config = require('../config.json');
} catch (e) {
  console.warn('Could not find local config.json, assumming production environment.\n');
  config = {"settings":{"prod":{"debug":"false","db":process.env.DATABASE_URL},"dev":{"debug":"false","db":process.env.DATABASE_URL}},"authentication_prod":{"token":process.env.SLACK},"authentication_dev":{"token":process.env.SLACK}};
}
var connectionString = process.env.DEV ? config.settings.dev.db : config.settings.prod.db;

// Our configuration and initialization for botkit
var setup = process.env.DEV ? config.settings.dev : config.settings.prod;
var controller = Botkit.slackbot(setup);
var authentication = process.env.DEV ? config.authentication_dev : config.authentication_prod;
controller.spawn(authentication).startRTM();

// Setup our express server, for later front-end interface
var express = require('express');
var server = express();
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
        bot.reply(message, ':robot_face: I am <@' + bot.identity.name +'> and have been running for ' + process.uptime() + ' seconds on ' + os.hostname() + '. Visit my user-interface at https://cfa.me/onboarding');
    });

    // Routes for our frontend-bot interface
    // GET /gimme returns item of choice, with limit specifications
    server.get('/gimme/:field', function(req, res) {
      // Request for some :field in the database
      var limit = req.query.limit || 10;
      var command = `SELECT * FROM ${req.params.field} LIMIT ${limit};`;
      // Get item specified with given command
      client.query(command, null, function(err, result) {
        res.json(result.rows);
      });
    });

    server.post('/take/:field/:id', function(req, res) {
      res.send('Welcome to the Code for America\'s onboarding-bot 🚢. Thank you for that!');
    });

    server.listen(port, function() {
      console.log('Listening on given port');
    });

    // Export for testing
    module.exports = controller;
});
