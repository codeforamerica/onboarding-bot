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
    type: Sequelize.STRING,
		allowNull: false
  }
};

export default Resource;
