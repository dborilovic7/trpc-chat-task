import { initTRPC } from "@trpc/server";

export const t = initTRPC.create();

export const appRouter = t.router({
  "": t.procedure.query(() => {
    return "Hello from the server!"
  })
});

export type AppRouter = typeof appRouter;