import Sequelize from 'sequelize';

const Training = {
	trainingCategory: {
		type: Sequelize.STRING,
		allowNull: false
	},
	trainingText: {
		type: Sequelize.STRING,
    allowNull: false
	}
};

export default Training;
