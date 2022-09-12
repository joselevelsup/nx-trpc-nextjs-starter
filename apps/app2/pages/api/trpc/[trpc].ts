import * as trpcNext from '@trpc/server/adapters/next';
import { app2Router, createContext } from '@nx-trpc-nextjs/trpc-router';

export default trpcNext.createNextApiHandler({
  router: app2Router,
  createContext,
});
