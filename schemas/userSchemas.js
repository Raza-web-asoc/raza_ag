import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id_user: Int
    username: String
    names: String
    last_names: String
    email: String
    gender: String
    birthday: String
    password: String
  }

  input LoginInput {
    username: String!
    password: String!
  }

  input UserInput {
    username: String!
    names: String!
    last_names: String!
    email: String!
    gender: String!
    birthday: String!
    password: String!
  }

  type AuthData {
    access_token: String
    token_type: String
  }

  type Signup {
    idUser: String
  }

  type Query {
    getUserData(token: String!): User
  }

  type Mutation {
    signup(input: UserInput!): Signup
    signin(input: LoginInput!): AuthData
  }
`;