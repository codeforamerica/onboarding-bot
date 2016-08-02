let natural = require('natural');
let chrono = require('chrono-node');

module.exports = function(text) {
  let date = chrono.parseDate(text);
  let person = text.match(/\<\@[a-z0-9]+\>/gim);
  return 'Ok, I\'ll update ' + person + '\'s schedule. They started ' + date + '! 💻🇺🇸';
}
