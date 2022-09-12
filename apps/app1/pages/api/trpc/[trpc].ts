import * as trpcNext from '@trpc/server/adapters/next';
import { app1Router, createContext } from '@nx-trpc-nextjs/trpc-router';

export default trpcNext.createNextApiHandler({
  router: app1Router,
  createContext,
});
