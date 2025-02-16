import axios from "axios";
import FormData from 'form-data';
import { GraphQLUpload } from 'graphql-upload';

export const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    userImage: async (_, { idUser }) => {
      try {
        const response = await axios.get(`${process.env.API_IMAGES_URL}/get-user-image`, {
          params: {
            idUser
          },
        });

        if (response.status !== 200) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        return response.data.image_url;
      } catch (error) {
        throw new Error(error.response ? error.response.data.detail : error.message);
      }
    },
    petImages: async (_, { idPet }) => {
      try {
        const response = await axios.get(`${process.env.API_IMAGES_URL}/get-pet-images`, {
          params: {
            idPet
          },
        });
        return response.data.images;
      } catch (error) {
        throw new Error("Error al obtener las imagenes de la mascota");
      }
    }
  },
  Mutation: {
    uploadUserImage: async (_, { idUser, file }) => {
      const { createReadStream, filename, mimetype } = await file;
      const formData = new FormData();
      formData.append('file', createReadStream(), { filename, contentType: mimetype });
      formData.append('idUser', idUser);

      try {
        const response = await axios.post(`${process.env.API_IMAGES_URL}/upload-user-image`, formData, {
          headers: formData.getHeaders(),
        });

        return response.data.message;
      } catch (error) {
        console.error("Error uploading file:", error.message);
        throw new Error('Error uploading file');
      }
    },
    uploadPetImages: async (_, { idPet, files }) => {

      const formData = new FormData();
      formData.append("idPet", idPet);

      await Promise.all(files.map(async (file, index) => {
        const { createReadStream, filename, mimetype } = await file;
        formData.append(`files`, createReadStream(), { filename, contentType: mimetype });
      }));

      try {
        const response = await axios.post(`${process.env.API_IMAGES_URL}/upload-pet-images`, formData, {
          headers: formData.getHeaders()
        });
        return response.data.message;
      } catch (error) {
        console.error("Error al subir las imágenes:", error.message);
        throw new Error("Error al subir las imágenes");
      }
    },
  },
};
