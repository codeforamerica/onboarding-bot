import {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString,
	GraphQLList,
	GraphQLSchema,
	GraphQLNonNull
} from 'graphql';

// We import our root Query and Mutation types
import Mutation from './mutations';
import Query from './queries';

// We simply define our GraphQL schema here
const Schema = new GraphQLSchema({
	query: Query,
	mutation: Mutation
});

export default Schema;
