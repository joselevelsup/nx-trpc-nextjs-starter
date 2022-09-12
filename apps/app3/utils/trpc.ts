import { createReactQueryHooks } from '@trpc/react';
import type { App3Router } from '@nx-trpc-nextjs/trpc-router';

export const trpc = createReactQueryHooks<App3Router>();
