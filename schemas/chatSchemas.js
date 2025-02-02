import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Chat {
    message_id: Int
    pet_id: Int
    message: String
    timestamp: String
  }

  input UniqueChatByPetsInput {
    pet_id1: Int!
    pet_id2: Int!
  }

  type chats {
    pets: [Int]
    messages: [Chat]
  }

  type allChats {
    data: [chats]
    count: Int
  }

  type Query {
    chats: allChats
    chatsByPet(pet_id: Int!): [Int]
    uniqueChatByPets(input: UniqueChatByPetsInput!): [Chat]
  }

  type Mutation {
    createChat(pet_id1: Int!, pet_id2: Int!): String
    sendMessage(pet_id1: Int!, pet_id2: Int!, pet_id_sender: Int!, message: String!): String
  }
`;