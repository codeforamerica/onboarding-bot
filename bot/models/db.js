import Sequelize from 'sequelize';
import MemberObj from './member';
import MessageObj from './message';
import ResourceObj from './resource';
import TrainingObj from './training';

// Training text to be ported to DB
const training_text = require('../training.json');

const Conn = new Sequelize(
	'onboarding',
	'Edmund',
	'america',
	{
		dialect: 'postgres',
		host: 'localhost'
	}
);

// Model definitions
const Member = Conn.define('member', MemberObj);
const Message = Conn.define('message', MessageObj);
const Resource = Conn.define('resource', ResourceObj);
const Training = Conn.define('training', TrainingObj);

// Relationships
Member.hasMany(Message, {onDelete: 'CASCADE'});
Message.belongsTo(Member);

// Sync our definitions, overriding previous renditions of models here
Conn.sync({force: true})
  	.then(() => {
      // Some fake data to start us off
      let tags = [ undefined, '<@U0V1ZHGJ3>', '<@U039XHJAA>', '<@U02S61FF2>'];
      let descripts = [ undefined, 'Edmund Korley, CODE 2040 Safety & Justice Intern', 'Tomas Apocada, Senior Safety & Justice Engineer', 'Tiffany Andrews, Safety & Justice Product Manager, 2015 Fellow']
      let last_message_ids = [ undefined, 1, 2, 3];
      let message_text = 'Hey, you, <@U02S61FF2>, and <@U039XHJAA> are starting the Wayne county police dashboard project soon, time 4 a kick-off potluck 🍲🍰';
      let time = '2016-07-19 09:30:50';

      for (var i = 1; i <= tags.length; i++) {
        if (tags[i] == undefined) continue;

        let tag = tags[i];
        let descript = descripts[i];
        let last_msg = last_message_ids[i];

        // Create members in database and a mock message in the database,
        Member.create({
  				memberTag: tag,
  				memberDescription: descript,
          lastMessageId: i
  			}).then(person => {
          return person.createMessage({
            messageText: message_text,
            timeToPost: time,
            senderTag: tags[1]
          })
        });
      }

			// Add a mock resource
			Resource.create({
				resourceTitle: 'List of Code of America staff contact info',
				resourceKeywords: 'contact,personell,lookup,phone number',
				resourceLink: 'https://docs.google.com/spreadsheets/d/18kj03DeHBSN4wIWxGk8xMrZz95tR7-HQtIc3cneMRDw/edit?ts=575ee783#gid=6'
			});

			// Port training text over to DB table
      for (let category in training_text) {
          training_text[category].forEach((text) => {
            Training.create({
              trainingCategory: category,
              trainingText: text
            });
          });
      }

    });


export default Conn;
