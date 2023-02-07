import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import schema from './schema/index';
import db from './db';
import { getServices } from './services/index';

const server = new ApolloServer({ schema });

(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async () => {
      // Connect to the DB before returning the context
      await db.connect();

      // These parameters will be accessible within nexus resolvers
      return { getServices, db };
    },
  });

  console.log(`The startup checklist startup server has started successfully at: ${url}`);
})();
