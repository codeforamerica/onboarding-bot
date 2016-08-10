import natural from 'natural';
import chrono from 'chrono-node';
import schema from '../graphql/schema';
import { graphql } from 'graphql';

let query = (category, trainingText) => {
  return `
  mutation {
    createTraining(
      trainingCategory: "${category}",
      trainingText: "${trainingText}"
    ) {
      id
    }
  }
  `;
};

module.exports = function(text, client, bot, message) {
    bot.startConversation(message, function(err, convo) {

        if (err) console.log(`***** ERROR ${err}`);

        convo.ask(
          'Do you want to teach me a new phrase?',
          [
              {
                  pattern: "yes",
                  callback(reply, convo) {
                      console.log(`****** CALLBACK RAN`);
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
                                // reply.text here is the category
                                let category = reply.text;
                                convo.ask(
                                  `
                                    Ok, type out the training text associated with the category: (I'll wait)
                                  `,
                                  [
                                    {
                                      default: true,
                                      callback(reply, convo) {
                                        // reply.text here is the training text
                                        let trainingText = reply.text;
                                        convo.say(`I've will try and add that to my database.`);
                                        graphql(schema, query(category, trainingText))
                                          .then((result) => {
                                            convo.say(
                                              `I did it! Here is the result:\n
                                              ${process.env.DEV ? JSON.stringify(`**** GRAPHQL ${result}`, null, '\t') : ""}
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
                                        convo.next();
                                      }
                                    }
                                  ]); // Training text response
                                convo.next();
                              }
                          }
                        ]); // Category response
                      convo.next();
                  }
              },
              {
                  pattern: "no",
                  callback(reply, convo) {
                    convo.say('Ok 🙂');
                    convo.next();
                  }
              },
              {
                  default: true,
                  callback(reply, convo) {
                    convo.say('Didn\'t quite get that 😕');
                    convo.next();
                  }
              }
          ]); // Confirmation response
  });
}
