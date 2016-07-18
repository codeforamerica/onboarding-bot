import {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString,
	GraphQLList,
	GraphQLSchema,
	GraphQLNonNull
} from 'graphql';

// We import the model definitions that GraphQL will lay on top of
import db from '../models/db';

// Our types (a port of the model definitions we did with Sequelize, in bot/models/)
import Member from './types/member';
import Message from './types/message';
import Resource from './types/resource';
import Training from './types/training';

// We import our root Query and Mutation types
// import Mutation from './mutations';
import Query from './queries';

// We simply define our GraphQL schema here
const Schema = new GraphQLSchema({
	query: Query
	// mutation: Mutation
});

export default Schema;
