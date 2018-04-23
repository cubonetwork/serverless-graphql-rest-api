const { graphqlLambda, graphiqlLambda } = require('apollo-server-lambda');
const myGraphQLSchema = require('./graphql/schema');

const graphqlHandler = graphqlLambda({ 
  schema: myGraphQLSchema,
  tracing: true,
  cacheControl: true
});

const graphiqlHandler = graphiqlLambda({
  endpointURL: '/graphql'
});

module.exports = { 
  graphqlHandler,
  graphiqlHandler
}