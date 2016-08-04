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
    bot.startConversation(message, function(err, convo) {

        if (err) console.log(`***** ERROR ${err}`);

        convo.ask(
          'Do you want to teach me a new phrase?',
          [
              {
                  pattern: "yes",
                  callback(reply, convo) {
                      convo.ask(
                        `
                          What category do you want to put this new phrase you are about to teach me?\n
                          ${process.env.DEV ? JSON.stringify(reply, null, '\t') : ""}
                        `,
                        [
                          {
                            pattern: 'nevermind',
                            callback(reply, convo) {
                              convo.say('Ok then ... 🙂');
                            }
                          },
                          {
                              default: true,
                              callback(reply, convo) {
                                convo.ask(
                                  `
                                    Ok, type out the training text associated with the category\n
                                    ${process.env.DEV ? JSON.stringify(reply, null, '\t') : ""}
                                  `,
                                  [
                                    {
                                      default: true,
                                      callback(reply, convo) {
                                        convo.say(`I've will try and add '${reply}' to my database.`);
                                        graphql(schema, query)
                                          .then((result) => {
                                            convo.say(
                                              `I did it! Here is the result:\n
                                              ${process.env.DEV ? JSON.stringify(reply, null, '\t') : ""}
                                              `
                                            );
                                            convo.next();
                                          })
                                          .catch((error) => {
                                            convo.say(
                                              `
                                                I couldn't do that heres why:\n
                                                ${JSON.stringify(error, null, '\t')}
                                              `
                                            );
                                            convo.next();
                                          });
                                      }
                                    }
                                  ]); // Training text response
                              }
                          }
                        ]); // Category response
                  }
              },
              {
                  pattern: "no",
                  callback(reply, convo) {
                    convo.say('Ok 🙂');
                  }
              },
              {
                  default: true,
                  callback(reply, convo) {
                    convo.say('Didn\'t quite get that 😕');
                  }
              }
          ]); // Confirmation response
  });
}
