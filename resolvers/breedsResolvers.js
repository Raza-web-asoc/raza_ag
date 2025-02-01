import axios from 'axios';

export const resolvers = {
  Query: {
    breeds: async (_, { id_raza }) => {
      let url;
      try {
        if (id_raza) {
          url = `${process.env.API_PETS_URL}/razas/${id_raza}`
        } else {
          url = `${process.env.API_PETS_URL}/razas`
        }
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        console.error(error);
        throw new Error("Error al obtener las razas");
      }
    },
  }
};