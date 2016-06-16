var natural = require('natural');
var Botkit = require('botkit');
var config = require('../config.json');
var training = require('./training.json');

var setup = process.env.DEV ? config.settings.dev : config.settings.prod;

var controller = Botkit.slackbot(setup);

controller.spawn(config.authentication).startRTM();

var classifier = new natural.BayesClassifier();

// For all the categories specified in training.json,
// we train the classifier on these sample text.
// e.g. classifier.addDocument('lets get @chris onboarded.', 'member_start');
// for (var key in training) {
//   classifier.addDocument(training[key], key);
// }
for (var key in training) {
  training[key].forEach(function(text) {
    classifier.addDocument(text, key);
  });
}
classifier.train();

// Set-up handler for bot's direct messaging response
controller.on('direct_message', function(bot, message) {
  var category = classifier.classify(message.text);
  bot.reply(message, category);
});

// Set-up handler for bot's direct mention response.
// Is available in channels that bot is in.
controller.on('direct_mention', function(bot, message) {
  var category = classifier.classify(message.text);
  bot.reply(message, category);
});

// Export for testing
module.exports = controller;
