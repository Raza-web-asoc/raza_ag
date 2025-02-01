import axios from 'axios';

export const resolvers = {
  Query: {
    pets: async (_, { id_usuario }) => {
      try {
        let url;
        if (id_usuario) {
          url = `${process.env.API_PETS_URL}/mascotas/usuario/${id_usuario}`;
        } else {
          url = `${process.env.API_PETS_URL}/mascotas/`;
        }
        const response = await axios.get(url);
        if (response.status !== 200) {
          throw new Error(`Error al obtener mascotas: ${response.statusText}`);
        }
        return response.data;
      } catch (error) {
        throw new Error(`Fallo en la consulta de mascotas: ${error.message}`);
      }
    },
    petByID: async (_, { pet_id }) => {
      try {
        const url = `${process.env.API_PETS_URL}/mascotas/${pet_id}`;
        const response = await axios.get(url);
        if (response.status !== 200) {
          throw new Error(`Error al obtener mascota: ${response.statusText}`);
        }
        return response.data;
      } catch (error) {
        throw new Error(`Fallo en la consulta de mascota: ${error.message}`);
      }
    }
  },
  Mutation: {
    registerPet: async (_, { input, token }) => {
      try {
        if (!token) {
          throw new Error("Token de autenticación no proporcionado.");
        }

        const { nombre_mascota, id_especie, id_raza, sexo, fecha_nacimiento } = input;

        if (!nombre_mascota || !id_especie || !id_raza || !sexo || !fecha_nacimiento) {
          throw new Error("Todos los campos son obligatorios para registrar una mascota.");
        }

        let authResponse;
        try {
          authResponse = await axios.get(`${process.env.API_AUTH_URL}/token`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } catch (authError) {
          throw new Error(`Error de autenticación: ${authError.response.data.detail}`);
        }

        const id_usuario = authResponse.data.id_user;

        const response = await axios.post(
          `${process.env.API_PETS_URL}/mascotas`,
          {
            nombre_mascota,
            id_especie,
            id_raza,
            sexo,
            fecha_nacimiento,
            id_usuario,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-auth-user-id": id_usuario,
            },
          }
        );
        return response.data;
      } catch (error) {
        throw new Error(`Fallo al registrar la mascota: ${error.message}`);
      }
    }
  },
};