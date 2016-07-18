import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
} from 'graphql';

const Training = new GraphQLObjectType({
	name: 'Training',
	description: 'This represents a training text',
	fields: () => {
		return {
			id: {
				type: GraphQLInt,
				resolve(training) {
					return training.id;
				}
			},
			trainingCategory: {
				type: GraphQLString,
				resolve(training) {
					return training.trainingCategory
				}
			},
			trainingText: {
				type: GraphQLString,
				resolve(training) {
					return training.trainingText
				}
			},
			createdAt: {
				type: GraphQLString,
				resolve(training) {
					return training.createdAt;
				}
			},
			updatedAt: {
				type: GraphQLString,
				resolve(training) {
					return training.updatedAt;
				}
			}
		}
	}
});

export default Training;
