const { graphqlLambda, graphiqlLambda } = require('apollo-server-lambda');
const { makeExecutableSchema } = require('graphql-tools');
const { schema } = require('./schema');
const { resolvers } = require('./resolvers');

const myGraphQLSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

const graphqlHandler = async (event, context, callback) => {
  callbackWithHeaders = (error, output) => {
    output.headers['Access-Control-Allow-Origin'] = '*';
    callback(error, output);
  }

  const handler = graphqlLambda({ 
    schema: myGraphQLSchema,
    tracing: true,
    cacheControl: true
  });

  return handler(event, context, callbackWithHeaders);
};

const graphiqlHandler = graphiqlLambda({
  endpointURL: '/graphql'
});

module.exports = { 
  graphqlHandler,
  graphiqlHandler
}