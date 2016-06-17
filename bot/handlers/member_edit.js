var natural = require('natural');
var chrono = require('chrono-node');

module.exports = function(text) {
  var date = chrono.parseDate(text);
  var person = text.match(/\<\@[a-z0-9]+\>/gim);
  return 'Hey, ' + person + ' will be onboarded ' + date + '! 🚢💻🇺🇸';
}
