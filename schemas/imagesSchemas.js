import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar Upload

  type Mutation {
    uploadUserImage(idUser: ID!, file: Upload!): String!
    uploadPetImages(idPet: ID!, files: [Upload!]!): String!
  }

  type Query {
    userImage(idUser: ID!): String
    petImages(idPet: ID!): [String]
  }
`;