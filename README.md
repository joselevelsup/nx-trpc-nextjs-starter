# NX + tRPC + Prisma + Next.js = ❤️

This repo is just a starting point to show tRPC in one library then used in Next.js in two different places inside of an entire monorepo. Overkill? Maybe. Awesome? Hell yeah!

Write your server in one place, serve from whereever you want. So instead of writing a REST server and having to serve from an entirely different process, just have Next.js do that for you with tRPC.

## What the apps doin?

Well App1 and App2 kind of do the same thing. They just show that they can query from their respective router. As you can see in `root/libs/trpc-router/src/lib/trpc-router.ts` there is a `baseRouter`. That can be removed and you can keep the routers COMPLETELY seperate. In this example, both routers inherit from the `baseRouter`;

Now App3 you can keep an eye on if you are going to include a DB (well I mean, why wouldn't you). App3 has a connection to the third router which has access to the DB. Examples are in the code. Take a look.

Please keep in mind, all these apps are pure barebone. No designs or CSS Frameworks/libraries were used.

### Run Each App

Each Next App starts on port 4200 so you wouldn't be able to run all at the same time.

- if you have NX installed gloabally `nx serve [which-ever-app]`. Example: `nx serve app1`
- Not installed globally `npx nx serve [which-ever-app]`. Example: `npx nx serve app1`

## Technologies

- [ NX Monorepo ](https://nx.dev)
- [tRPC](https://trpc.io)
- [Next.js](https://nextjs.org)
- [Prisma](https://www.prisma.io/)

### Inspirations

- [T3 Stack](https://github.com/t3-oss/create-t3-app)
- [ tRPC Awesome Collections Starting Point ](https://trpc.io/docs/v9/awesome-trpc#-starting-points-example-projects-etc)
