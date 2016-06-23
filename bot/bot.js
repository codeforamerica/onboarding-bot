var Botkit = require('botkit');
var botResponse = require('./response');
var pg = require('pg').native;
var config = require('../config.json');
var queryDB = require('./query.js');
var connectionString = process.env.DEV ? config.settings.dev.db : config.settings.prod.db;

// Our configuration and initialization for botkit
var setup = process.env.DEV ? config.settings.dev : config.settings.prod;
var controller = Botkit.slackbot(setup);
controller.spawn(config.authentication).startRTM();

// Connect to our Postges database
pg.connect(connectionString, function(err, client) {
    if (err) console.warn('ERROR 🚫:\n', err);

    // Dummy request for latest_message
    queryDB(client, function(result) {
      console.log('SUCCESS ✅:\n', result);
    });

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
      botResponse(message.text, function (text) {
        bot.reply(message, text);
      });
    });

    // Export for testing
    module.exports = controller;
});
