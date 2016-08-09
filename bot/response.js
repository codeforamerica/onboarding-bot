let natural = require('natural');
let member_start = require('./handlers/member_start');
let member_info = require('./handlers/member_info');
let member_edit = require('./handlers/member_edit');
let resources_info = require('./handlers/resources_info');
let personnel_info = require('./handlers/personnel_info');
let quiet_mode = require('./handlers/quiet_mode');
let add_training = require('./handlers/add_training');
let remove_training = require('./handlers/remove_training');

// Text to train Bayesian classifier on
let training = require('./training.json');
let classifier = new natural.BayesClassifier();

// For all the categories specified in training.json,
// we train the classifier on these sample text.
// e.g. classifier.addDocument('lets get @chris onboarded.', 'member_start');
for (let key in training) {
  training[key].forEach(function(text) {
    classifier.addDocument(text, key);
  });
}
classifier.train();

// Export logic
module.exports = function(text, client, bot, message) {
  let category = classifier.classify(text);
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
    case 'add_training':
      add_training(text, client, bot, message);
      break;
    case 'remove_training':
      remove_training(text, client, bot, message);
      break;
    default:
      return 'I did\'t understand that 😕. Here is some list of things I can do.';
      // List bot features
      // Ping moderators in CfA onboarding slack channel
  }
}
