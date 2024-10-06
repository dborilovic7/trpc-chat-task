import { changeNickname, deleteLastMessage } from "./clientHandler";
import type { Message, ChatCommands, ChatCommandWithoutArgs, ChatCommandWithArgs } from "./types";

const chatCommandsWithoutArgs: ChatCommands = {
  "oops": ({ userId, channelId }: ChatCommandWithoutArgs) => {
    deleteLastMessage(userId, channelId);
    return { shouldSendMessage: false };
  }
}

const chatCommandsWithArgs: ChatCommands = {
  "nick": ({ arg, userId }: ChatCommandWithArgs) => {
    arg.length > 0 && changeNickname(userId, arg);
    return { shouldSendMessage: false };
  },
  "think": ({ arg }: ChatCommandWithArgs) => {
    const shouldSendMessage = arg.length < 1 ? false : true;
    return { shouldSendMessage, newText: arg, thinkStyling: true };
  }
}

const commandRegex = /^\w+/;

export const findAndExecuteChatCommand = (input: Message) => {
  let { userId, channelId, text } = input;

  try {
    if(!text.startsWith("/")) return { shouldSendMessage: true };
    text = text.replace("/", "");
  
    const [command] = text.match(commandRegex) ?? [""];
  
    let commandFunction = chatCommandsWithoutArgs[command];
    if(typeof commandFunction === "function") return commandFunction({ userId, channelId });
  
    commandFunction = chatCommandsWithArgs[command];
    if(typeof commandFunction === "function") {
      const arg = text.replace(commandRegex, "").trim();
      return commandFunction({ arg, userId, channelId });
    };

    return { shouldSendMessage: true, newText: text }
  } catch(error) {
    console.error(error);
  }
}