var Botkit = require('botkit');
var config = require('../config.json');

var setup = process.env.DEV ? config.settings.dev : config.settings.prod;

var controller = Botkit.slackbot(setup);

controller.spawn(config.authentication).startRTM();

// Set-up handler for bot's direct messaging response
controller.on('direct_message', function(bot, message) {
  bot.reply(message, 'Hey there 😜, it\'s just you and me.');
});

// Set-up handler for bot's direct mention response.
// Is available in channels that bot is in.
controller.on('direct_mention', function(bot, message) {
  bot.reply(message, 'Hey there 😜');
});

// Export for testing
module.exports = controller;
