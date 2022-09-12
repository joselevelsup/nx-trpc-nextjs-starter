import * as trpcNext from '@trpc/server/adapters/next';
import { app3Router, createContextWithDB } from '@nx-trpc-nextjs/trpc-router';

export default trpcNext.createNextApiHandler({
  router: app3Router,
  createContext: createContextWithDB,
});
