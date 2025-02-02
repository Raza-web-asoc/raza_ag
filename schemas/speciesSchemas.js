import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Species {
    id_especie: Int
    nombre_especie: String
  }

  type Query {
    species(id_especie: Int): [Species]
  }
`;