const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    robots: [Robot]
    attacks: [Attack]
  }

  type Mutation {
    addRobot(seed: String): Robot 
  }

  type Robot {
    id: ID!
    seed: String!
    name: String!
    image: String!
    level: Int!
    health: Int!
    attacks: [Attack]!
  }

  type Attack {
    id: ID!
    seed: String!
    name: String!
    level: Int!
    damage: Int!
  }
`;

module.exports = typeDefs;
