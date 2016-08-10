import natural from 'natural';
import chrono from 'chrono-node';
import moment from 'moment';
import querystring from 'querystring';
import { graphql } from 'graphql';
import schema from '../graphql/schema';

let query = (memberTag, memberDescription, startDate, lastMessageId) => {
  return `
    mutation {
        createMember(
            memberTag: "${memberTag}",
            memberDescription: "${memberDescription}",
            startDate: "${startDate}"
        ) {
            id
        }
    }
  `;
};

module.exports = function(text, client, bot, message) {
    let date = chrono.parseDate(text);
    let timeFromNow = moment(date).fromNow();
    let person = text.match(/\<\@[a-z0-9]+\>/gim);

    bot.startConversation(message, (err, convo) => {
        if (err) console.log(`***** ERROR ${err}`);

        convo.ask(
            'Did you want to add a new member to the database?',
            [
                {
                    pattern: 'yes',
                    callback(reply, convo) {
                        let person = text.match(/\<\@[a-z0-9]+\>/gim);
                        convo.ask(
                            `Please tell me the person you want to add and when they start`,
                            [
                                {
                                    pattern: 'nevermind',
                                    callback(reply, convo) {
                                        convo.say('Nevermind? Ok I\'ll forget about it ...');
                                        convo.next();
                                    }
                                },
                                {
                                    default: true,
                                    callback(reply, convo) {
                                        let person = reply.text.match(/\<\@[a-z0-9]+\>/gim);
                                        let date = chrono.parseDate(reply.text);
                                        convo.ask(
                                            `Did you want to add ${person}, who starts on ${date}?`,
                                            [
                                                {
                                                    pattern: 'yes',
                                                    callback(reply, convo) {
                                                        convo.say('Ok I\'m going to try to add them to my database! Give me a sec ...');

                                                        // Here I pull self-description information via Slack API

                                                        graphql(schema, query(person, 'New member!', date))
                                                            // When graphql query returns result
                                                            .then((result) => {
                                                                convo.say(`
                                                                    Done! \n
                                                                    ${process.env.DEV ? JSON.stringify(result, null, '\t') : ""}
                                                                `);
                                                                convo.next();
                                                            })
                                                            // When graphql query returns error
                                                            .catch((error) => {
                                                                convo.say(`😧😓`);i
                                                                convo.say(`An error happened. Lets start over. 💐`);
                                                                convo.say(`
                                                                    ${process.env.DEV ? JSON.stringify(error, null, '\t') : "" }
                                                                `);
                                                                convo.next();
                                                            });
                                                        convo.next();
                                                    }
                                                }
                                            ]
                                        );
                                        convo.next();
                                    }
                                }
                            ]
                        );
                        convo.next();
                    }
                },
                {
                    pattern: 'no',
                    callback(reply, convo) {
                        convo.say('Ok then 😐');
                        convo.next();
                    }
                }
            ]
        );
        convo.next();
    });
}
