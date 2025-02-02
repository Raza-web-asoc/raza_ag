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

  input EditUserInput {
  names: String
  last_names: String
  email: String
  gender: String
  birthday: String
}


  type AuthData {
    access_token: String
    token_type: String
  }

  type Signup {
    idUser: Int
  }

  type Query {
    getUserData(token: String!): User
  }

  type Mutation {
    signup(input: UserInput!): Signup
    signin(input: LoginInput!): AuthData
    editUser(input: EditUserInput!, token: String!): String
  }
`;