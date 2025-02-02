import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Breeds {
    id_raza: Int
    nombre_raza: String
    id_especie: Int
    historia: String
  }

  type Query {
    breeds(id_raza: Int): [Breeds]
  }
`;