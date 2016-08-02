let natural = require('natural');

module.exports = function(text) {
  let person = text.match(/\<\@[a-z0-9]+\>/gim);
  return 'Hey, ' + person + ' is an employee at 💻🇺🇸';
}
