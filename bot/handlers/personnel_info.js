var natural = require('natural');

module.exports = function(text) {
  var person = text.match(/\<\@[a-z0-9]+\>/gim);
  return 'Hey, ' + person + ' is an employee at 💻🇺🇸';
}
