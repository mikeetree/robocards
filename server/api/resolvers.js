const resolvers = {
  Query: {
    robots: (_, __, { dataSources }) => {
      return dataSources.robotAPI.getRobots();
    },
    attacks: (_, __, { dataSources }) => {
      return dataSources.robotAPI.getAttacks();
    },
  },

  Mutation: {
    addRobot: (_, { seed }, { dataSources }) => {
      return dataSources.robotAPI.addRobot(seed);
    },
  },
  
  Robot: {
    attacks: ({ attacks }, _, { dataSources}) => {
      return attacks.map((id) => dataSources.robotAPI.getAttackById(id));
    },
  },
};

module.exports = resolvers;
