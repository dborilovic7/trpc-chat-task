import { router, publicProcedure } from "./trpc";
import { observable } from "@trpc/server/observable";
import { z } from "zod";
import { EventEmitter } from "events";
import { loginUser } from "./clientHandler";

type Message = {
  nickname: string;
  message: string;
}

const ee = new EventEmitter();

export const appRouter = router({
  "": publicProcedure
    .query(() => {
      return "Hello from the server!";
    }),

  login: publicProcedure
    .input(z.object({
      id: z.string(),
      nickname: z.string()
    }))
    .mutation(({input}) => {
      const { id, nickname } = input;
      loginUser(id, nickname);
    }),

  onMessage: publicProcedure
    .input(z.string())
    .subscription(({input}) => {
      return observable<Message>(emit => {
        const onMessage = (data: Message) => {
          emit.next(data);
        }

        ee.on("message", onMessage);

        return () => {
          ee.off("message", onMessage);
        }
      });
    }),

  message: publicProcedure
    .input(z.object({
      nickname: z.string(),
      message: z.string()
    }))
    .mutation(async ({input}) => {
      ee.emit("message", input);
    })
});

export type AppRouter = typeof appRouter;