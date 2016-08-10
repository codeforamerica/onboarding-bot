import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLFloat
} from 'graphql';

// Our GraphQL model types to be specified in the Mutation
import Member from '../types/member';
import Resource from '../types/resource';
import Message from '../types/message';
import Training from '../types/training';
import Group from '../types/group';

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
					memberDescription: { type: new GraphQLNonNull(GraphQLString) },
          startDate: { type: GraphQLString }
				},
				resolve(_, args) {
					return db.models.member.create({
						memberTag: args.memberTag,
						memberDescription: args.memberDescription,
            startDate: args.startDate
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
      addToGroup: {
				type: Group,
				args: {
					groupName: { type: new GraphQLNonNull(GraphQLString) },
          memberIds: { type: new GraphQLList(GraphQLInt) }
				},
				resolve(_, args) {
					return db.models.member
            .findAll({
              where: {
                id: { $in: args.memberIds }
              }
            })
            .then((members) => {
              return members.map((member) => {
                return member.createGroup({
        						groupName: args.groupName
        					});
              });
            });
				}
			},
      removeFromGroup: {
        type: Group,
        args: {
					ids: {type: new GraphQLNonNull(GraphQLInt)}
				},
        resolve(_, args){
          return db.models.group.destroy({
            where: {
              id: {
                $in: args.ids
              }
            }
          });
        }
      },
      createMessages: {
        type: Message,
        args: {
          messageText: { type: new GraphQLNonNull(GraphQLString) },
          timeToPost: { type: new GraphQLNonNull(GraphQLString) },
          senderTag: { type: new GraphQLNonNull(GraphQLString) },
          memberIds: { type: new GraphQLList(GraphQLInt) }
        },
        resolve(_, args) {
          return db.models.member
            .findAll({
              where: {
                id: { $in: args.memberIds }
              }
            })
            .then((members) => {
              return members.map((member) => {
                return member.createMessage({
                    messageText: args.messageText,
                    timeToPost: args.timeToPost,
                    senderTag: args.senderTag
                  });
              });

            });
        }
      },
			deleteMessages: {
				type: Message,
				args: {
					ids: {type: new GraphQLNonNull(GraphQLInt)}
				},
				resolve(_, args){
					return db.models.message.destroy({
						where: {
              id: {
                $in: args.ids
              }
            }
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
			createResource: {
				type: Resource,
				args: {
					resourceTitle: { type: new GraphQLNonNull(GraphQLFloat) },
					resourceKeywords: { type: new GraphQLNonNull(GraphQLString) },
					resourceLink: { type: new GraphQLNonNull(GraphQLString) }
				},
				resolve(_, args) {
					return db.models.resource.create({
						resourceTitle: args.resourceTitle,
						resourceKeywords: args.resourceKeywords,
						resourceLink: args.resourceLink
					});
				}
			},
			deleteResource: {
				type: Resource,
				args: {
					id: { type: new GraphQLNonNull(GraphQLInt) }
				},
				resolve(_, args) {
					return db.models.resource.destroy({
						where: {id: args.id}
					});
				}
			},
			updateResource: {
				type: Resource,
				args: {
				    resourceTitle: { type: new GraphQLNonNull(GraphQLFloat) },
					resourceKeywords: { type: new GraphQLNonNull(GraphQLString) },
					resourceLink: { type: new GraphQLNonNull(GraphQLString) },
                    id: { type: new GraphQLNonNull(GraphQLInt) }
				},
				resolve(_, args){
					return db.models.resource.update({
						resourceTitle: args.resourceTitle,
						resourceKeywords: args.resourceKeywords,
						resourceLink: args.resourceLink
					}, {
						where: {id: args.id}
					});
				}
			},
      createTraining: {
				type: Training,
				args: {
					trainingCategory: { type: new GraphQLNonNull(GraphQLString) },
					trainingText: { type: new GraphQLNonNull(GraphQLString) }
				},
				resolve(_, args) {
					return db.models.training.create({
						trainingCategory: args.trainingCategory,
						trainingText: args.trainingText
					});
				}
			},
			deleteTraining: {
				type: Training,
				args: {
					id: { type: new GraphQLNonNull(GraphQLInt) }
				},
				resolve(_, args) {
					return db.models.training.destroy({
						where: {id: args.id}
					});
				}
			},
			updateTraining: {
				type: Training,
				args: {
                    trainingCategory: { type: new GraphQLNonNull(GraphQLFloat) },
					          trainingText: { type: new GraphQLNonNull(GraphQLString) },
                    id: { type: new GraphQLNonNull(GraphQLInt) }
				},
				resolve(_, args){
					return db.models.training.update({
						trainingCategory: args.trainingCategory,
						trainingText: args.trainingText
					}, {
						where: {id: args.id}
					});
				}
			}

		}
	}
});

export default Mutation;
