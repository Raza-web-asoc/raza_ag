import axios from 'axios';

export const resolvers = {
  Query: {
    species: async (_, { id_especie }) => {
      let url;
      try {
        if (id_especie) {
          url = `${process.env.API_PETS_URL}/especies/${id_especie}`
        } else {
          url = `${process.env.API_PETS_URL}/especies`
        }
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        console.error(error);
        throw new Error("Error al obtener las especies");
      }
    },
  }
};