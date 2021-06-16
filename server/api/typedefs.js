const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    tests: [Test]!
  }

  type Test {
    msg: String!
  }
`;

module.exports = typeDefs;