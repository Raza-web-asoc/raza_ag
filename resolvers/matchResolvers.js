import axios from 'axios';

export const resolvers = {
  Mutation: {
    match: async (_, { input, token }) => {
      const { idmascota1, idmascota2, match } = input;
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
      console.log(`${process.env.API_MATCH_URL}/api/match`)
      try {
        const response = await axios.post(`${process.env.API_MATCH_URL}/api/match`, {
          idmascota1,
          idmascota2,
          match
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        return response.data.message
      } catch (error) {
        console.error(error)
        throw new Error("Error al crear el match")
      }
    },
  }
};