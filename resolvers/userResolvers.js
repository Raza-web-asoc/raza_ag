import axios from 'axios';

export const resolvers = {
  Query: {
    getUserData: async (_, { token }) => {
      try {
        const response = await axios.get(`${process.env.API_AUTH_URL}/token`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status !== 200) {
          throw new Error("Token inválido o no autorizado.");
        }

        return response.data;
      } catch (error) {
        throw new Error(`Fallo en la consulta de usuario: ${error.message}`);
      }
    }
  },
  Mutation: {
    signin: async (_, { input }) => {
      const { username, password } = input;

      try {
        const response = await axios.post(`${process.env.API_AUTH_URL}/signin`, new URLSearchParams({
          username: username,
          password: password
        }), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        });

        if (response.status !== 200) {
          throw new Error(`Error al iniciar sesión: ${response.statusText}`);
        }

        return response.data;
      } catch (error) {
        throw new Error(`Fallo al iniciar sesión: ${error.message}`);
      }
    },
    signup: async (_, { input }) => {
      const { username, names, last_names, email, password, birthday, gender } = input;
      try {
        const response = await axios.post(`${process.env.API_AUTH_URL}/signup`, {
          username,
          names,
          last_names,
          email,
          password,
          birthday,
          gender
        });
        return response.data;
      } catch (error) {
        if (error.response) {
          throw new Error("Error al registrar:", error.response.data.detail);
        } else {
          throw new Error("Error en la conexión:", error.message);
        }
      }
    },
    editUser: async (_, { input, token }) => {
      const { names, last_names, email, birthday, gender } = input;
      try {
        const response = await axios.put(
          `${process.env.API_AUTH_URL}/user/update`,
          {
            names,
            last_names,
            email,
            birthday,
            gender
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        return response.data.message;
      } catch (error) {
        //console.error(error);
        throw new Error("Error al actualizar el perfil");
      }
    }
  },
};
