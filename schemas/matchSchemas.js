import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Match {
    idmascota1: Int
    idmascota2: Int
  }

  input MatchInput {
    idmascota1: Int!
    idmascota2: Int!
    match: Int!
  }

  type Mutation {
    match(input: MatchInput!, token: String!): String
  }
`;