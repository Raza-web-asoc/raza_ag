import axios from 'axios';

export const resolvers = {
  Query: {
    ads: async (_, { user_id }) => {
      let url;
      try {
        if (user_id ) {
          url = `${process.env.API_ADS_URL}/adds?user_id=${user_id}`;
        } else {
          url = `${process.env.API_ADS_URL}/adds/`
        }
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        console.error(error);
        throw new Error("Error al obtener los anuncios");
      }
    },
  }
};