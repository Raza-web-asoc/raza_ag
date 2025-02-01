import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Pet {
    nombre_mascota: String
    id_especie: Int
    id_raza: Int
    sexo: String
    fecha_nacimiento: String
    id_mascota: Int
    id_usuario: Int
    fecha_registro: String
  }

  type Query {
    pets(id_usuario: Int): [Pet]
    petByID(pet_id: Int!): Pet
  }

  input PetInput {
    nombre_mascota: String!
    id_especie: Int!
    id_raza: Int!
    sexo: String!
    fecha_nacimiento: String!
  }

  type Mutation {
    registerPet(input: PetInput!, token: String!): Pet
  }
`;