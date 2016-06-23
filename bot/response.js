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
module.exports = function(text, client, cb) {
  var category = classifier.classify(text);
  switch (category) {
    case 'member_start':
      cb(member_start(text));
      break;
    case 'member_info':
      cb(member_info(text));
      break;
    case 'member_edit':
      cb(member_edit(text));
      break;
    case 'resources_info':
      cb(resources_info(text));
      break;
    case 'personnel_info':
      cb(personnel_info(text));
      break;
    case 'quiet_mode':
      cb(quiet_mode(text));
      break;
    default:
      cb('I don\'t understand that 😕');
  }
}
