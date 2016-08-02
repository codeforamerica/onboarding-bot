import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql';

// Our GraphQL model types to be specified in the query
import Member from '../types/member';
import Resource from '../types/resource';
import Message from '../types/message';
import Training from '../types/training';

// Import our Sequelize ORM models to back GraphQL queries
import db from '../../models/db';

/* Our root query types */
const Query = new GraphQLObjectType({
	name: 'Query',
	description: 'This is a root query',
	fields: () => {
		return {
			members: {
				type: new GraphQLList(Member),
				args: {
          ids: { type: new GraphQLList(GraphQLInt) },
          memberTags: { type: new GraphQLList(GraphQLString) }
				},
				resolve(root, args) {
					return db.models.member.findAll({
						where: {
              id: { $in: args.ids }
            }
					});
				}
			},
      resources: {
        type: new GraphQLList(Resource),
        args: {
          id: { type: GraphQLInt },
          resourceTitle: { type: GraphQLString }
        },
        resolve(root, args) {
          return db.models.resource.findAll({
            where: args
          });
        }
      },
      messages: {
        type: new GraphQLList(Message),
        args: {
          id: { type: GraphQLInt },
          senderTag: { type: GraphQLString }
        },
        resolve(root, args) {
          return db.models.message.findAll({
            where: args
          });
        }
      },
      trainings: {
        type: new GraphQLList(Training),
        args: {
          id: { type: GraphQLInt },
          trainingCategory: { type: GraphQLString }
        },
        resolve(root, args) {
          return db.models.training.findAll({
            where: args
          });
        }
      }
		}
	}
});

export default Query;
