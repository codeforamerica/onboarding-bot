import Sequelize from 'sequelize';

// This actually a list of member instances for a given group.
// If a given member was in five different groups,
// they would take up five rows in DB.
const Group = {
	groupName: {
		type: Sequelize.STRING,
		allowNull: false
	}
};

export default Group;
