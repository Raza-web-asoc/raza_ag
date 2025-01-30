const { ApolloServer, gql } = require('apollo-server-express');
const { GraphQLUpload, graphqlUploadExpress } = require('graphql-upload');
const express = require('express');
const axios = require('axios');
const FormData = require('form-data');

const typeDefs = gql`
  scalar Upload

  type Query {
    _empty: String
  }

  type Mutation {
    uploadImage(file: Upload!): String
  }
`;

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    _empty: () => "Hello, world!"
  },
  Mutation: {
    uploadImage: async (_, { file }) => {
      console.log("Received file:", file);
      const { createReadStream, filename, mimetype } = await file;
      const formData = new FormData();
      formData.append('file', createReadStream(), { filename, contentType: mimetype });

      try {
        const response = await axios.post('http://localhost:3000/upload', formData, {
          headers: formData.getHeaders(),
        });
        console.log("Upload response:", response.data);
        return response.data.url;
      } catch (error) {
        console.error("Error uploading file:", error.message);
        throw new Error('Error uploading file');
      }
    },
  },
};

async function startServer() {
  const app = express();
  app.use(graphqlUploadExpress());

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
