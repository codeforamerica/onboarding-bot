let natural = require('natural');
let chrono = require('chrono-node');
import schema from '../graphql/schema';
import { graphql } from 'graphql';

const query = `
mutation {
  createTraining(
    trainingCategory: "member_start",
    trainingText: "They will start soon!"
  ) {
    id
  }
}
`;

module.exports = function(text, client, bot, message) {
  return graphql(schema, query).then((result) => {

    bot.startConversation(message, function(err, convo) {

        if (err) console.log(`***** ERROR ${err}`);

        convo.ask(
          // 'Do you want to teach me a new phrase?',
          // The 'message' the bot is going to ask
          {
            attachments: [
                {
                    title: 'Great, do you want to teach me a new phrase?',
                    callback_id: 'abc123',
                    attachment_type: 'default',
                    actions: [
                        {
                            "name":"yes",
                            "text": "Yes",
                            "value": "yes",
                            "type": "button",
                        },
                        {
                            "name":"no",
                            "text": "No",
                            "value": "no",
                            "type": "button",
                        }
                    ]
                }
            ]
        },
        // The specified callbacks that will run given users response
        [
            {
                pattern: "yes",
                callback(reply, convo) {
                    console.log('***** CB RAN');
                    convo.say(`What phrase do you want me to learn? \n ${reply}`);
                    convo.say(`Ok, I\'ved updated my database. Here is the resulting unique id of the transaction ${32133322}! 💻🇺🇸`)
                    convo.next();
                }
            },
            {
                pattern: "no",
                callback(reply, convo) {
                    console.log('***** CB RAN', JSON.stringify(bot.utterances, null, '\t'));
                    convo.say('Ok 🙂');
                    convo.next();
                }
            },
            {
                default: true,
                callback(reply, convo) {}
            }
        ]);
    });

  });
}
