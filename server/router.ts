import { router, publicProcedure } from "./trpc";
import { observable } from "@trpc/server/observable";
import { z } from "zod";
import { EventEmitter } from "events";
import { loginUser, usersArray, getOrCreateChannel, channels, channelMessages } from "./clientHandler";
import type { Message, User } from "./types";
import { findAndExecuteChatCommand } from "./chatCommands";
import replaceCharacters from "./replaceCharacters";

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
    .mutation(({ input }) => {
      const { id, nickname } = input;
      loginUser(id, nickname);
    }),

  onUsersUpdate: publicProcedure
    .input(z.string())
    .subscription(({ input }) => {
      return observable<User[]>(emit => {
        const onUsersUpdate = () => emit.next(usersArray(input));

        mainEE.on("usersUpdate", onUsersUpdate);
        
        return () => {
          mainEE.off("usersUpdate", onUsersUpdate);
        }
      });
    }),

  getUsers: publicProcedure
    .input(z.string())
    .query(({ input }) => usersArray(input)),

  getChannelData: publicProcedure
    .input(z.object({
      userId: z.string(),
      partnerId: z.string()
    }))
    .mutation(({ input }) => {
      const { userId, partnerId } = input;
      return getOrCreateChannel(userId, partnerId);
    }),

  onMessage: publicProcedure
    .input(z.string())
    .subscription(({ input: channelId }) => {
      return observable<Message>(emit => {
        const onMessage = (data: Message) => {
          emit.next(data);
        }

        channels.get(channelId)!.on("message", onMessage);

        return () => {
          channels.get(channelId)?.off("message", onMessage);
          channels.delete(channelId);
          console.log(`Deleted channel with id ${channelId}`);
          console.log(`Channels size: ${channels.size}\n`);
        }
      });
    }),

  message: publicProcedure
    .input(z.object({
      userId: z.string(),
      channelId: z.string(),
      text: z.string()
    }))
    .mutation(({ input }) => {
      let { userId, channelId, text } = input;

      const { shouldSendMessage, ...args } = findAndExecuteChatCommand(input);
      text = args.newText ?? text;
      const thinkStyling = args.thinkStyling ?? false;

      if(shouldSendMessage) {
        text = replaceCharacters(text);

        const channel = channels.get(channelId);
        channelMessages[channelId].push({ userId, channelId, text, thinkStyling });
        channel?.emit("message", { userId, channelId, text, thinkStyling });
      }
    }),

    onMessagesUpdate: publicProcedure
    .input(z.string())
    .subscription(({ input: channelId }) => {
      return observable<Message[]>(emit => {
        const channel = channels.get(channelId)!;
        const onMessagesUpdate = (data: Message[]) => emit.next(data);

        channel.on("messagesUpdate", onMessagesUpdate);
        
        return () => {
          channel.off("messagesUpdate", onMessagesUpdate);
        }
      });
    }),
});

export type AppRouter = typeof appRouter;