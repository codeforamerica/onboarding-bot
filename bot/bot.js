var Botkit = require('botkit');
var response = require('./response');

// Our configuration and initialization for botkit
var config = require('../config.json');
var setup = process.env.DEV ? config.settings.dev : config.settings.prod;
var controller = Botkit.slackbot(setup);
controller.spawn(config.authentication).startRTM();

// Set-up handler for bot's direct messaging response
controller.on('direct_message', function(bot, message) {
  console.log('RECEIVED', message);
  response(message.text, function (text) {
    bot.reply(message, text);
  });
});

// Set-up handler for bot's direct mention response.
// Is available in channels that bot is in.
controller.on('direct_mention', function(bot, message) {
  console.log('RECEIVED', message);
  response(message.text, function (text) {
    bot.reply(message, text);
  });
});

// Export for testing
module.exports = controller;
