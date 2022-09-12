import { createReactQueryHooks } from '@trpc/react';
import type { App2Router } from '@nx-trpc-nextjs/trpc-router';

export const trpc = createReactQueryHooks<App2Router>();
