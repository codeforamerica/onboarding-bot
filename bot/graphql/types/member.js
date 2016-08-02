import {
	GraphQLInt,
	GraphQLString,
	GraphQLList,
	GraphQLObjectType
} from 'graphql';
import Message from './message';
import Group from './group';

const Member = new GraphQLObjectType({
	name: 'Member',
	description: 'This represents a member',
	fields: () => {
		return {
			id: {
				type: GraphQLInt,
				resolve(member) {
					return member.id;
				}
			},
			memberTag: {
				type: GraphQLString,
				resolve(member) {
					return member.memberTag
				}
			},
			memberDescription: {
				type: GraphQLString,
				resolve(member) {
					return member.memberDescription
				}
			},
			startDate: {
				type: GraphQLString,
				resolve(member) {
					return member.startDate
				}
			},
			lastMessageId: {
				type: GraphQLInt,
				resolve(member) {
					return member.lastMessageId;
				}
			},
			createdAt: {
				type: GraphQLString,
				resolve(member) {
					return member.createdAt;
				}
			},
			updatedAt: {
				type: GraphQLString,
				resolve(member) {
					return member.updatedAt;
				}
			},
			messages: {
				type: new GraphQLList(Message),
				resolve(member) {
					return member.getMessages()
				}
			},
			groups: {
				type: new GraphQLList(Group),
				resolve(member) {
					return member.getGroups()
				}
			}
		}
	}
});

export default Member;
