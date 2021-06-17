const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./api/typedefs');
const resolvers = require('./api/resolvers');
const RobotAPI = require('./api/datasources/RobotAPI');
const generator = require('./api/data/generate');

generator.generateAndAdd(5, 50);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      robotAPI: new RobotAPI(),
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
