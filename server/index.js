const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./api/typedefs');
const resolvers = require('./api/resolvers');
const TestSource = require('./api/datasources/test-source');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      testSource: new TestSource(),
    };
  },
});

server.listen().then(({ url, port }) => {
  console.log(`
    🚀  Server is running!
    🔉  Listening on port ${port}
    📭  Query at ${url}
  `);
});
