import Sequelize from 'sequelize';

const Resource = {
	resourceTitle: {
		type: Sequelize.STRING,
		allowNull: false
	},
	resourceKeywords: {
		type: Sequelize.STRING,
		allowNull: false
	},
  resourceLink: {
    type: Sequelize.INTEGER,
		allowNull: false
  }
};

export default Resource;
