var natural = require('natural');
var member_start = require('./handlers/member_start');

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
module.exports = function(text, cb) {
  var category = classifier.classify(text);
  switch (category) {
    case 'member_start':
      cb(member_start(text));
      break;
    default:
      cb('I don\'t understand that 😕');
  }
}
