var path = require('path');
var Botkit = require('botkit');
var botResponse = require('./response');
var pg = require('pg').native;
var config;
try {
  config = require('../config.json');
} catch (e) {
  console.warn('ERROR 🚫:\n', e);
  config = {"settings":{"prod":{"debug":"false","db":process.env.DATABASE_URL},"dev":{"debug":"false","db":process.env.DATABASE_URL}},"authentication":{"token":process.env.SLACK}};
}
var queryDB = require('./query.js');
var connectionString = process.env.DEV ? config.settings.dev.db : config.settings.prod.db;

// Our configuration and initialization for botkit
var setup = process.env.DEV ? config.settings.dev : config.settings.prod;
var controller = Botkit.slackbot(setup);
controller.spawn(config.authentication).startRTM();

// Setup our express server, for later front-end interface
var express = require('express');
var server = express();
var port = process.env.PORT || 8000;
var dir = path.join(__dirname, '/../public');
server.use(express.static(dir));

// Connect to our Postges database
pg.connect(connectionString, function(err, client) {
    if (err) console.warn('ERROR 🚫:\n', err);

    // Dummy request for some message in database
    // queryDB(client, function(result) {
    //   console.log('SUCCESS ✅:\n', result);
    // });

    // Set-up handler for bot's direct messaging response
    controller.on('direct_message', function(bot, message) {
      console.log('RECEIVED', message);
      botResponse(message.text, client, function (text) {
        bot.reply(message, text);
      });
    });

    // Set-up handler for bot's direct mention response.
    // Is available in channels that bot is in.
    controller.on('direct_mention', function(bot, message) {
      console.log('RECEIVED', message);
      botResponse(message.text, client, function (text) {
        bot.reply(message, text);
      });
    });

    // Routes for our frontend-bot interface
    server.get('/gimme', function(req, res) {
      res.send('Welcome to the Code for America\'s onboarding-bot 🚢. Here\'s what you asked for.');
    });

    server.get('/takethis', function(req, res) {
      res.send('Welcome to the Code for America\'s onboarding-bot 🚢. Thank you for that!');
    });

    server.listen(port, function() {
      console.log('Listening on given port');
    });

    // Export for testing
    module.exports = controller;
});
