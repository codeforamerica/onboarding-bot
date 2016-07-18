const natural = require('natural');
const chrono = require('chrono-node');
const moment = require('moment');
const querystring = require('querystring');

module.exports = function(text, client, bot, message) {
  var date = chrono.parseDate(text);
  var timeFromNow = moment(date).fromNow();
  var person = text.match(/\<\@[a-z0-9]+\>/gim);

  // TODO: Query Slack user.info API to get deets about ${person} prior to registering them in DB

  client.query(`INSERT INTO members (members_id,members_name,members_descript,last_message_id) VALUES (DEFAULT, '${querystring.escape(person)}', 'New person to be onboarded', 4);`, null, function(err, result) {
    if (err || !date || !person) {
      bot.reply(message, `Sorry, can\'t do that because ... \n ${err || '🙃'}`);
    } else {
      bot.reply(message, 'Ok, I\'ve added that event to my database. ' + person + ' will be onboarded ' + timeFromNow + '! 💻🇺🇸');
    }
    console.log("DB result 🗃:", result);
  });
}
