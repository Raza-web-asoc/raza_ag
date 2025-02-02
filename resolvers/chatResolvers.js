import axios from 'axios';

export const resolvers = {
	Query: {
		uniqueChatByPets: async (_, { input }) => {
			const { pet_id1, pet_id2 } = input;
			try {
				const response = await axios.get(`${process.env.API_CHATS_URL}/chats/get-chat/${pet_id1}/${pet_id2}`);
				return response.data;
			} catch (error) {
				throw new Error("Error al obtener los chats");
			}
		},
		chatsByPet: async (_, { pet_id }) => {
			try {
				const response = await axios.get(`${process.env.API_CHATS_URL}/chats/get-available-chats/${pet_id}`);
				return response.data;
			} catch (error) {
				throw new Error("Error al obtener los chats");
			}
		},
		chats: async () => {
			try {
				const response = await axios.get(`${process.env.API_CHATS_URL}/chats/all`);
				return response.data;
			} catch (error) {
				throw new Error("Error al obtener los chats");
			}
		}
	},
	Mutation: {
		createChat: async (_, { pet_id1, pet_id2 }) => {
			try {
				const response = await axios.post(`${process.env.API_CHATS_URL}/chats/create-chat/${pet_id1}/${pet_id2}`);
				return response.data.message;
			} catch (error) {
				throw new Error("Error al crear el chat");
			}
		},
		sendMessage: async (_, { pet_id1, pet_id2, pet_id_sender, message }) => {
			try {
				const response = await axios.post(`${process.env.API_CHATS_URL}/chats/save-message`,
					{ pets: [pet_id1, pet_id2], pet_id: pet_id_sender, message: message }
				);
				return response.data.message;
			} catch (error) {
				throw new Error("Error al enviar el mensaje");
			}
		}
	}
};