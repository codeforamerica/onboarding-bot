let natural = require('natural');
let chrono = require('chrono-node');
import schema from '../graphql/schema';
import { graphql } from 'graphql';

const query = `
mutation {
  createTraining(
    trainingCategory: "member_start",
    trainingText: "They will start soon!"
  ) {
    id
  }
}
`

module.exports = function(text) {
  return graphql(schema, query).then((result) => {
    return `Ok, I\'ved updated my database. Here is the result ${result}! 💻🇺🇸`;
  });
}
