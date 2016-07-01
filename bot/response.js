var natural = require('natural');
var member_start = require('./handlers/member_start');
var member_info = require('./handlers/member_info');
var member_edit = require('./handlers/member_edit');
var resources_info = require('./handlers/resources_info');
var personnel_info = require('./handlers/personnel_info');
var quiet_mode = require('./handlers/quiet_mode');

// Text to train Bayesian classifier on
var training = require('./training.json');
var classifier = new natural.BayesClassifier();

// For all the categories specified in training.json,
// we train the classifier on these sample text.
// e.g. classifier.addDocument('lets get @chris onboarded.', 'member_start');
for (var key in training) {
  training[key].forEach(function(text) {
    classifier.addDocument(text, key);
  });
}
classifier.train();

// Export logic
module.exports = function(text, client, bot, message) {
  var category = classifier.classify(text);
  switch (category) {
    case 'member_start':
      member_start(text, client, bot, message);
      break;
    case 'member_info':
      member_info(text, client, bot, message);
      break;
    case 'member_edit':
      member_edit(text, client, bot, message);
      break;
    case 'resources_info':
      resources_info(text, client, bot, message);
      break;
    case 'personnel_info':
      personnel_info(text, client, bot, message);
      break;
    case 'quiet_mode':
      quiet_mode(text, client, bot, message);
      break;
    default:
      return 'I don\'t understand that 😕';
      // TODO: If bot doesn't understand a phrase,
      // it could ask moderators in CfA onboarding slack channel what they meant.
  }
}
