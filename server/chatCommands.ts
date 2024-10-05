import { changeNickname, deleteLastMessage } from "./clientHandler";
import { Message } from "./types";

const chatCommandsWithoutArgs: { [key: string]: Function } = {
  "oops": ({userId, channelId}: {userId: string, channelId: string}) => {
    deleteLastMessage(userId, channelId);
    return {shouldSendMessage: false};
  }
}

const chatCommandsWithArgs: { [key: string]: Function } = {
  "nick": ({arg, userId}: {arg: string, userId: string}) => {
    arg.length > 0 && changeNickname(userId, arg);
    return {shouldSendMessage: false};
  },
  "think": ({arg}: {arg: string}) => {
    const shouldSendMessage = arg.length < 1 ? false : true;
    return {shouldSendMessage, newText: arg, thinkStyling: true};
  }
}

const commandRegex = /^\w+/;

export const findAndExecuteChatCommand = (input: Message) => {
  let { userId, channelId, text } = input;

  try {
    if(!text.startsWith("/")) return {shouldSendMessage: true};
    text = text.replace("/", "");
  
    const [command] = text.match(commandRegex) ?? [""];
  
    let commandFunction = chatCommandsWithoutArgs[command];
    if(typeof commandFunction === "function") return commandFunction({userId, channelId});
  
    commandFunction = chatCommandsWithArgs[command];
    if(typeof commandFunction === "function") {
      const arg = text.replace(commandRegex, "").trim();
      return commandFunction({arg, userId, channelId});
    };

    return {shouldSendMessage: true, newText: text}
  } catch(error) {
    console.error(error);
  }
}