import natural from 'natural';
import chrono from 'chrono-node';
import moment from 'moment';
import querystring from 'querystring';
import { graphql } from 'graphql';

let query = (memberTag, memberDescription, startDate, lastMessageId) => {
  return `
    mutation {
        createMember(
            memberTag: "${memberTag}",
            memberDescription: "${memberDescription}",
            startDate: "${startDate}",
            lastMessageId: "${lastMessageId}"
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
                            `Did you want to add ${person}, who starts on ${date}? If not tell me who you want to add and what's their start date.`,
                            [
                                {
                                    pattern: 'yes',
                                    callback(reply, convo) {
                                        convo.say('Ok I\'m going to try to add that to my database! Give me a sec ...');
                                        graphql(schema, query(person, 'New member!', date, undefined))
                                            .then((result) => {
                                                convo.say(`
                                                    Done! \n
                                                    ${process.env.DEV ? JSON.stringify(`**** GRAPHQL ${result}`, null, '\t') : ""}
                                                `);
                                                convo.next();
                                            })
                                            .catch((error) => {
                                                convo.say(`😧😓`);i
                                                convo.say(`An error happened. Lets start over. 💐`);
                                                convo.say(`${process.env.DEV ? JSON.stringify(`**** ERROR ${error}`, null, `\t`)}`);
                                                convo.next();
                                            });
                                        convo.next();
                                    }
                                },
                                {
                                    pattern: 'no',
                                    callback(reply, convo) {
                                        convo.ask(
                                            `Did you want to add ${person}, who starts on ${date}?`,
                                            [
                                                {
                                                    pattern: 'yes'
                                                },
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
