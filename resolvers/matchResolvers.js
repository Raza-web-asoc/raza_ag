import axios from 'axios';

export const resolvers = {
  Mutation: {
    match: async (_, { input, token }) => {
      const { id_mascota1, id_mascota2, tipo_interaccion } = input;
      if (!token) {
        throw new Error("Token no encontrado")
      }

      let authResponse;
      try {
        authResponse = await axios.get(`${process.env.API_AUTH_URL}/token`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (authError) {
        throw new Error(`Error de autenticación: ${authError.response.data.detail}`);
      }
      try {
        const response = await axios.post(`${process.env.API_MATCH_URL}/api/swipe`, {
          id_mascota1,
          id_mascota2,
          tipo_interaccion
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        return response.data
      } catch (error) {
        throw new Error("Error al crear el match")
      }
    },
  }
};