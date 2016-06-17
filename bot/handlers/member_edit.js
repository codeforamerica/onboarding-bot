var natural = require('natural');
var chrono = require('chrono-node');

module.exports = function(text) {
  var date = chrono.parseDate(text);
  var person = text.match(/\<\@[a-z0-9]+\>/gim);
  return 'Ok, I\'ll update ' + person + '\'s schedule. They started ' + date + '! 🚢💻🇺🇸';
}
