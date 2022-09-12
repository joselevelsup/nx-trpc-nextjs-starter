import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import * as z from 'zod';
import superjson from 'superjson';
import { prisma } from './client';

// Put global data or variables here to be accessible to the router's context
// Your db connection could be here
// User info could be here
// The Color purple could be here
// Refer to https://trpc.io/docs/v9/context for more about context
const createContext = () => null;

//Lines 15 to 24 are borrowed from the T3 Stack. This is how an ORM like Prisma could be incorporated into a context
type CreateContextOptions = Record<string, never>;
const createContextInner = async (opts: CreateContextOptions) => {
  return {
    prisma,
  };
};

const createContextWithDB = async (opts: trpcNext.CreateNextContextOptions) => {
  return await createContextInner({});
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;

export type ContextWithDB = trpc.inferAsyncReturnType<
  typeof createContextWithDB
>;

//This router contains no context
const createRouter = () => trpc.router<Context>();

// This createRouter point is only for using the DB
const createRouterWithDB = () => trpc.router<ContextWithDB>();

//App1 and App2 use the BaseRouter as a starting point
//The query 'forAll' is available in both routers
const baseRouter = createRouter()
  .transformer(superjson)
  .query('forAll', {
    input: z.object({
      name: z.string(),
    }),
    resolve: ({ input: { name } }) => {
      return `Hello ${name}`;
    },
  });

const app1Router = baseRouter.query('todosFromApp1', {
  resolve: () => {
    const data: Array<{ id: number; task: string; isDone: boolean }> = [
      { id: 1, task: 'Get Eggs', isDone: false },
      { id: 2, task: 'Walk Dog', isDone: false },
      { id: 3, task: 'Check for linux updates', isDone: true },
    ];
    return data;
  },
});

const app2Router = baseRouter.query('todosFromApp2', {
  resolve: () => {
    const data: Array<{ id: number; task: string; isDone: boolean }> = [
      { id: 1, task: 'Get Eggs', isDone: false },
      { id: 2, task: 'Walk Dog', isDone: false },
      { id: 3, task: 'Check for linux updates', isDone: true },
    ];
    return data;
  },
});

//App3Router cannot be merged with the baseRouter cause they both use different contexts
//App3Router uses an ORM. For this Example, Prisma.
const app3Router = createRouterWithDB()
  .transformer(superjson)
  .query('getTasksFromDB', {
    resolve: async ({ ctx }) => {
      return await ctx.prisma.toDos.findMany();
    },
  })
  .mutation('makeTask', {
    input: z.object({
      task: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.toDos.create({
        data: { ...input, isDone: false },
        select: {
          id: true,
        },
      });
    },
  })
  .mutation('markTaskDone', {
    input: z.object({
      taskId: z.number(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.toDos.update({
        where: {
          id: input.taskId,
        },
        data: {
          isDone: true,
        },
      });
    },
  })
  .mutation('removeTask', {
    input: z.object({
      taskId: z.number(),
    }),
    resolve: async ({ ctx, input: { taskId } }) => {
      return await ctx.prisma.toDos.delete({
        where: {
          id: taskId,
        },
      });
    },
  });

export type App1Router = typeof app1Router;
export type App2Router = typeof app2Router;
export type App3Router = typeof app3Router;

export {
  app1Router,
  app2Router,
  app3Router,
  createContext,
  createContextWithDB,
};
