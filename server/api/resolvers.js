const resolvers = {
  Query: {
    tests: (_, __, { dataSources }) => dataSources.testSource.getMessages(),
  },
};

module.exports = resolvers;