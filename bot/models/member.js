import Sequelize from 'sequelize';

const Member = {
	memberTag: {
		type: Sequelize.STRING,
		allowNull: false
	},
	memberDescription: {
		type: Sequelize.STRING
	},
  lastMessageId: {
    type: Sequelize.INTEGER
  }
};

export default Member;
