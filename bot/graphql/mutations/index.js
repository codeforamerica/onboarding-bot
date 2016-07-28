import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql';

// Our GraphQL model types to be specified in the Mutation
import Member from '../types/member';
import Resource from '../types/resource';
import Message from '../types/message';
import Training from '../types/training';

// Import our Sequelize ORM models to back GraphQL queries
import db from '../../models/db';

// Our root Mutation
const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	description: 'Hooks to create data',
	fields: () => {
		return {
			createMember: {
				type: Member,
				args: {
					memberTag: { type: new GraphQLNonNull(GraphQLString) },
					memberDescription: { type: new GraphQLNonNull(GraphQLString) }
				},
				resolve(_, args) {
					return db.models.member.create({
						memberTag: args.memberTag,
						memberDescription: args.memberDescription
					});
				}
			},
			deleteMember: {
				type: Member,
				args: {
					id: { type: new GraphQLNonNull(GraphQLInt) }
				},
				resolve(_, args){
					return db.models.member.destroy({
						where: {id: args.id}
					});
				}
			},
			updateMember: {
				type: Member,
				args: {
					memberTag: { type: new GraphQLNonNull(GraphQLString) },
					memberDescription: { type: new GraphQLNonNull(GraphQLString) },
					lastMessageId: { type: new GraphQLNonNull(GraphQLInt) },
					id: { type: new GraphQLNonNull(GraphQLInt) }
				},
				resolve(_, args){
					return db.models.member.update({
						memberTag: args.memberTag,
						memberDescription: args.memberDescription,
						lastMessageId: args.lastMessageId
					}, {
						where: { id: args.id }
					});
				}
			},
			createMessage: {
				type: Message,
				args: {
					messageText: { type: new GraphQLNonNull(GraphQLString) },
					timeToPost: { type: new GraphQLNonNull(GraphQLString) },
					senderTag: { type: new GraphQLNonNull(GraphQLString) },
          memberIds: { type: new GraphQLList(GraphQLInt) }
				},
				resolve(_, args) {
          console.log(db.models.member.findAll( { where: { $in: { id: args.memberIds } } } ));
					return db.models.member
            .findAll({
              where: {
                $in: { id: args.memberIds }
              }
            })
            .then((member) => {
              return member.messageCreate({
      						messageText: args.messageText,
      						timeToPost: args.timeToPost,
      						senderTag: args.senderTag
      					});
            });
				}
			},
			deleteMessage: {
				type: Message,
				args: {
					id: {type: new GraphQLNonNull(GraphQLInt)}
				},
				resolve(_, args){
					return db.models.message.destroy({
						where: {id: args.id}
					});
				}
			},
			updateMessage: {
				type: Message,
				args: {
					rating: { type: GraphQLFloat },
					ratingCount: { type: GraphQLInt },
					handle: { type: new GraphQLNonNull(GraphQLString) },
					id: { type: new GraphQLNonNull(GraphQLInt) }
				},
				resolve(_, args){
					return db.models.message.update({
						rating: args.rating,
						ratingCount: args.ratingCount,
						businessName: args.businessName,
						logoUrl: args.logoUrl,
						handle: args.handle
					}, {
						where: {id: args.id}
					});
				}
			},
			createItem: {
				type: Item,
				args: {
					price: { type: new GraphQLNonNull(GraphQLFloat) },
					description: { type: new GraphQLNonNull(GraphQLString) },
					imageUrl: { type: new GraphQLNonNull(GraphQLString) },
					name: { type: new GraphQLNonNull(GraphQLString) },
					messageId: { type: new GraphQLNonNull(GraphQLInt) }
				},
				resolve(_, args) {
					return db.models.item.create({
						price: args.price,
						description: args.description,
						imageUrl: args.imageUrl,
						name: args.name,
						messageId: args.messageId
					});
				}
			},
			deleteItem: {
				type: Item,
				args: {
					id: { type: new GraphQLNonNull(GraphQLInt) }
				},
				resolve(_, args){
					return db.models.item.destroy({
						where: {id: args.id}
					});
				}
			},
			updateItem: {
				type: Item,
				args: {
					id: { type: new GraphQLNonNull(GraphQLInt) },
					price: { type: new GraphQLNonNull(GraphQLFloat) },
					description: { type: new GraphQLNonNull(GraphQLString) },
					imageUrl: { type: new GraphQLNonNull(GraphQLString) },
					name: { type: new GraphQLNonNull(GraphQLString) }
				},
				resolve(_, args){
					return db.models.item.update({
						price: args.price,
						description: args.description,
						imageUrl: args.imageUrl,
						name: args.name
					}, {
						where: {id: args.id}
					});
				}
			}
		}
	}
});

export default Mutation;
