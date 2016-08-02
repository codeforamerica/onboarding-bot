import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
} from 'graphql';

const Resource = new GraphQLObjectType({
	name: 'Resource',
	description: 'This represents a resource',
	fields: () => {
		return {
			id: {
				type: GraphQLInt,
				resolve(resource) {
					return resource.id;
				}
			},
			resourceTitle: {
				type: GraphQLString,
				resolve(resource) {
					return resource.resourceTitle
				}
			},
			resourceKeywords: {
				type: GraphQLString,
				resolve(resource) {
					return resource.resourceKeywords
				}
			},
			resourceLink: {
				type: GraphQLString,
				resolve(resource) {
					return resource.resourceLink;
				}
			},
			createdAt: {
				type: GraphQLString,
				resolve(resource) {
					return resource.createdAt;
				}
			},
			updatedAt: {
				type: GraphQLString,
				resolve(resource) {
					return resource.updatedAt;
				}
			}
		}
	}
});

export default Resource;
