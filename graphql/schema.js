const { makeExecutableSchema } = require('graphql-tools');
const { resolvers } = require('./resolvers');
const Types = require('./types');

const Query = `
  type Query {
    getCompanyInfo(id: String!): Company!
    getConnections(companyId: String!): [CompanyConnections]
  }
`;

const SchemaDefinition = `
  schema {
    query: Query
  }
`;

module.exports =  makeExecutableSchema({
  typeDefs: [
    SchemaDefinition,
    Query,
    ...Types
  ],
  resolvers,
}); 