import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Match {
    id_mascota1: Int
    id_mascota2: Int
  }

  input MatchInput {
    id_mascota1: Int!
    id_mascota2: Int!
    tipo_interaccion: String!
  }

  type Interaction {
    id_mascota1: Int!
    id_mascota2: Int!
    tipo_interaccion: String!
  }

  type MatchResponse {
    message: String
    match: String
  }

  type Mutation {
    match(input: MatchInput!, token: String!): MatchResponse
  }

  type Query {
    interactions_by_id(id_mascota: Int!): [Interaction] 
  }
`;