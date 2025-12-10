import { ApolloServer } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload";
import express from "express";
import prometheusMiddleware from "express-prometheus-middleware";

import { typeDefs as userTypeDefs } from "./schemas/userSchemas.js";
import { resolvers as userResolvers } from "./resolvers/userResolvers.js";

import { typeDefs as petTypeDefs } from "./schemas/petsSchemas.js";
import { resolvers as petResolvers } from "./resolvers/petsResolvers.js";

import { typeDefs as imagesTypeDefs } from "./schemas/imagesSchemas.js";
import { resolvers as imagesResolvers } from "./resolvers/imagesResolvers.js";

import { typeDefs as speciesTypeDefs } from "./schemas/speciesSchemas.js";
import { resolvers as speciesResolvers } from "./resolvers/speciesResolvers.js";

import { typeDefs as breedsTypeDefs } from "./schemas/breedsSchemas.js";
import { resolvers as breedsResolvers } from "./resolvers/breedsResolvers.js";

import { typeDefs as matchTypeDefs } from "./schemas/matchSchemas.js";
import { resolvers as matchResolvers } from "./resolvers/matchResolvers.js";

import { typeDefs as chatTypeDefs } from "./schemas/chatSchemas.js";
import { resolvers as chatResolvers } from "./resolvers/chatResolvers.js";

import {typeDefs as adsTypeDefs} from "./schemas/adsSchemas.js";
import {resolvers as adsResolvers} from "./resolvers/adsResolvers.js";

import client from "prom-client"; // Cliente Prometheus
import cors from "cors";

async function startServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // Configurar la carga de archivos (graphql-upload)
  app.use(graphqlUploadExpress());

  app.use(
    prometheusMiddleware({
      metricsPath: "/metrics",
      collectDefaultMetrics: true,
      labels: { source: "backend" },
    })
  );

  const frontendRequestCounter = new client.Counter({
    name: "frontend_http_requests_total",
    help: "Total de solicitudes HTTP recibidas desde el frontend",
    labelNames: ["method", "status", "url"],
  });

  // Endpoint para recibir métricas desde el frontend
  app.get('/front-metrics', (req, res) => {
    const { method, status, url } = req.query;
    frontendRequestCounter.inc({ method, status, url }); // Incrementar métrica
    res.json({ msg: 'Metricas actualizadas' })
  });

  const server = new ApolloServer({
    typeDefs: [
      adsTypeDefs,
      userTypeDefs,
      petTypeDefs,
      imagesTypeDefs,
      speciesTypeDefs,
      breedsTypeDefs,
      matchTypeDefs,
      chatTypeDefs,
    ],
    resolvers: [
      adsResolvers,
      userResolvers,
      petResolvers,
      imagesResolvers,
      speciesResolvers,
      breedsResolvers,
      matchResolvers,
      chatResolvers,
    ],
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`Metrics available at http://localhost:${PORT}/metrics`);
  });
}

startServer();
