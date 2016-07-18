import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql';
import Member from '../types/member';
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
					id: {
						type: GraphQLInt
					},
					memberTag: {
						type: GraphQLString
					}
				},
				resolve(root, args) {
					return db.models.member.findAll({
						where: args
					})
				}
			}
		}
	}
});

export default Query;
