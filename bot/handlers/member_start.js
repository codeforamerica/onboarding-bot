var natural = require('natural');
var chrono = require('chrono-node');

module.exports = function(text, client) {
  var date = chrono.parseDate(text);
  var person = text.match(/\<\@[a-z0-9]+\>/gim);

  client.query(`INSERT INTO members (member_id,member_name,member_descript,last_message_id) VALUES
  (4,${person},'New person to be onboarded',4)`, null, function(err, result) {
    if (err) { console.log(err) };
    return 'Ok, I\'ve added that event to my database. ' + person + ' will be onboarded ' + date + '! 💻🇺🇸';
  });
}
