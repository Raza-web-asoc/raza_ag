import { ApolloServer } from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';
import express from 'express';

import { typeDefs as userTypeDefs } from './schemas/userSchemas.js';
import { resolvers as userResolvers } from './resolvers/userResolvers.js';

import { typeDefs as petTypeDefs } from './schemas/petsSchemas.js';
import { resolvers as petResolvers } from './resolvers/petsResolvers.js';

import { typeDefs as imagesTypeDefs } from './schemas/imagesSchemas.js';
import { resolvers as imagesResolvers } from './resolvers/imagesResolvers.js';

import { typeDefs as speciesTypeDefs } from './schemas/speciesSchemas.js';
import { resolvers as speciesResolvers } from './resolvers/speciesResolvers.js';

import { typeDefs as breedsTypeDefs } from './schemas/breedsSchemas.js';
import { resolvers as breedsResolvers } from './resolvers/breedsResolvers.js';

import { typeDefs as matchTypeDefs } from './schemas/matchSchemas.js';
import { resolvers as matchResolvers } from './resolvers/matchResolvers.js';

import { typeDefs as chatTypeDefs } from './schemas/chatSchemas.js';
import { resolvers as chatResolvers } from './resolvers/chatResolvers.js';

async function startServer() {
  const app = express();

  // Configurar la carga de archivos (graphql-upload)
  app.use(graphqlUploadExpress());

  const server = new ApolloServer({
    typeDefs: [
      userTypeDefs,
      petTypeDefs,
      imagesTypeDefs,
      speciesTypeDefs,
      breedsTypeDefs,
      matchTypeDefs,
      chatTypeDefs],
    resolvers: [
      userResolvers,
      petResolvers,
      imagesResolvers,
      speciesResolvers,
      breedsResolvers,
      matchResolvers,
      chatResolvers],
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
