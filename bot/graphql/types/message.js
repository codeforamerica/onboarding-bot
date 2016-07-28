import {
	GraphQLInt,
	GraphQLString,
	GraphQLObjectType
} from 'graphql';
import Member from './member';

const Message = new GraphQLObjectType({
	name: 'Message',
	description: 'This represents a message',
	fields: () => {
		return {
			id: {
				type: GraphQLInt,
				resolve(message) {
					return message.id;
				}
			},
			messageText: {
				type: GraphQLString,
				resolve(message) {
					return message.messageText
				}
			},
			timeToPost: {
				type: GraphQLString,
				resolve(message) {
					return message.timeToPost
				}
			},
			senderTag: {
				type: GraphQLString,
				resolve(message) {
					return message.senderTag;
				}
			},
			createdAt: {
				type: GraphQLString,
				resolve(message) {
					return message.createdAt;
				}
			},
			updatedAt: {
				type: GraphQLString,
				resolve(message) {
					return message.updatedAt;
				}
			},
			member: {
				type: Member,
				resolve(message) {
					return message.getMember()
				}
			}
		}
	}
});

export default Message;
