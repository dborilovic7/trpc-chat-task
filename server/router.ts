import { router, publicProcedure } from "./trpc";
import { observable } from "@trpc/server/observable";
import { z } from "zod";
import { EventEmitter } from "events";
import { loginUser, otherUsers } from "./clientHandler";
import type { Message, User } from "./types";

export const mainEE = new EventEmitter();

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

  onUsersUpdate: publicProcedure
    .input(z.string())
    .subscription(({input}) => {
      return observable<User[]>(emit => {
        const onUsersUpdate = () => emit.next(otherUsers(input));

        mainEE.on("usersUpdate", onUsersUpdate);
        
        return () => {
          mainEE.off("usersUpdate", onUsersUpdate);
        }
      });
    }),

  getUsers: publicProcedure
    .input(z.string())
    .query(({input}) => otherUsers(input)),

  onMessage: publicProcedure
    .input(z.string())
    .subscription(({input}) => {
      return observable<Message>(emit => {
        const onMessage = (data: Message) => {
          emit.next(data);
        }

        mainEE.on("message", onMessage);

        return () => {
          mainEE.off("message", onMessage);
        }
      });
    }),

  message: publicProcedure
    .input(z.object({
      nickname: z.string(),
      message: z.string()
    }))
    .mutation(async ({input}) => {
      mainEE.emit("message", input);
    })
});

export type AppRouter = typeof appRouter;