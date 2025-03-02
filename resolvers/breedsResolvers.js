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
    breedsBySpecie: async (_, { id_especie }) => {
      try {
        const url = `${process.env.API_PETS_URL}/razas/${id_especie}`;
        const response = await axios.get(url);

        // Verifica si la respuesta es un arreglo
        if (Array.isArray(response.data)) {
          return response.data;
        } else {
          console.error("La respuesta no es un arreglo:", response.data);
          return []; // Devuelve un arreglo vacío si la respuesta no es válida
        }
      } catch (error) {
        console.error(error);
        throw new Error("Error al obtener las razas por especie");
      }
    }
  }
};