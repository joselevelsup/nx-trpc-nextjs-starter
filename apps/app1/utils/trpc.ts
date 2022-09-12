import { createReactQueryHooks } from '@trpc/react';
import type { App1Router } from '@nx-trpc-nextjs/trpc-router';

export const trpc = createReactQueryHooks<App1Router>();
