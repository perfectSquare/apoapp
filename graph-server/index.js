import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import express from 'express';
import 
  { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } 
  from 'apollo-server-core';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import {mongoose} from 'mongoose';
import { typeDefs } from './schema.js'
import { resolvers } from "./resolvers/resolver.js"
import { admins } from './db/admins.js'
import { cats } from './db/cats.js'
import { mobiles } from './db/mobiles.js'

const schema = makeExecutableSchema({ 
  typeDefs,
  resolvers,  
 });

const app = express();
const httpServer = createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,  
  path: '/graphql',
});

const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  schema,
  context:{
    admins,
    cats,
    mobiles,
  },
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },

    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
});
mongoose.connect('mongodb://localhost:27017/mobilestore', () => {
  console.log("db connected")
})
await server.start();
server.applyMiddleware({ app });

const PORT = 2000;
// Now that our HTTP server is fully set up, we can listen to it.
httpServer.listen(PORT, () => {
  console.log(
    `Server is now running on http://localhost:${PORT}${server.graphqlPath}`,
  );
});