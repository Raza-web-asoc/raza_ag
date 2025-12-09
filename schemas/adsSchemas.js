import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Ad {
    id: Int
    title: String
    description: String
    image_base64: String

  }

  type Query {
    ads(id_raza: Int): [Ad]
  }
`;