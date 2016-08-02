import {
	GraphQLInt,
	GraphQLString,
	GraphQLList,
	GraphQLObjectType
} from 'graphql';

const Group = new GraphQLObjectType({
	name: 'Group',
	description: 'This represents a group',
	fields: () => {
		return {
			id: {
				type: GraphQLInt,
				resolve(group) {
					return group.id;
				}
			},
			groupName: {
				type: GraphQLString,
				resolve(group) {
					return group.groupName
				}
			},
			createdAt: {
				type: GraphQLString,
				resolve(group) {
					return group.createdAt;
				}
			},
			updatedAt: {
				type: GraphQLString,
				resolve(group) {
					return group.updatedAt;
				}
			}
		}
	}
});

export default Group;
