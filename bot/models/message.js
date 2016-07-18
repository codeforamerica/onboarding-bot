import Sequelize from 'sequelize';

const Message = {
	messageText: {
		type: Sequelize.STRING,
		allowNull: false
	},
  timeToPost: {
    type: Sequelize.STRING,
    allowNull: false
  },
  senderTag: {
    type: Sequelize.STRING,
    allowNull: false
  }
};

export default Message;
