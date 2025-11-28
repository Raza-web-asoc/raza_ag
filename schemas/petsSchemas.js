import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Pet {
    nombre_mascota: String
    id_raza: Int
    sexo: String
    fecha_nacimiento: String
    id_mascota: Int
    id_usuario: Int
    id_especie: Int
    fecha_registro: String
    nombre_especie: String
    nombre_raza: String
  }

  type Query {
    pets(id_usuario: Int): [Pet]
    petByID(pet_id: Int!): Pet
    petsForMatch(id_usuario: Int!,id_especie:Int!): [Pet]
  }

  input PetInput {
    nombre_mascota: String!
    id_raza: Int!
    sexo: String!
    fecha_nacimiento: String!
  }

  type Mutation {
    registerPet(input: PetInput!, token: String!): Pet
    deletePetsByUser(token: String!): DeleteResponse
  }

  type DeleteResponse {
    success: Boolean!
    message: String
  }
`;