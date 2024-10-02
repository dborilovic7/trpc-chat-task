import { useState, Dispatch, SetStateAction } from "react";
import ChatMessage from "./ChatMessage";
import InactiveChatArea from "./InactiveChatArea";
import type { Message, User } from "../../../../server/types";

type ChatAreaPropTypes = {
  uuid: string;
  chatPartner: User|null;
  setChatPartner: Dispatch<SetStateAction<User|null>>;
}

const ChatArea = ({uuid, chatPartner, setChatPartner}: ChatAreaPropTypes) => {
  const [messages, setMessages] = useState<Message[]>([]);

  return chatPartner ? (
    <div id="chat-area-container" className="md:flex flex-col bg-bubbles sm:rounded-xl md:rounded-none
      md:col-span-3 lg:col-span-2">
      
      <div id="chat-area-header" className="flex justify-between items-center border-b border-black/25
        px-4 py-2 sm:px-8 sm:py-4 xl:py-5">

        <div id="chat-area-person" className="flex items-center">
          <img
            src="/src/assets/images/avatar-ph.png"
            alt="User profile picture"
            className="border-2 border-medium-ruby rounded-full w-16 h-16 2xl:w-20 2xl:h-20"
          />
          
          <div id="chat-area-person-info" className="ml-2 text-black">
            <h3 className="text-2xl 2xl:text-3xl">{chatPartner.nickname}</h3>
            <p className="text-medium-ruby 2xl:text-lg">Online</p>
          </div>
        </div>

        <button id="close-chat" className="w-10 h-10" onClick={() => setChatPartner(null)}>
          <img src="/src/assets/icons/close.svg" alt="Close icon" />
        </button>
      </div>
      
      <div id="chat-area" className="w-full h-chat-area-xs sm:h-chat-area-sm xl:h-chat-area-xl 2xl:h-chat-area-2xl
        p-4 sm:p-6 md:p-8 text-xl 2xl:text-2xl leading-5 2xl:leading-6 overflow-auto">
        <ChatMessage you={false}>Pozdrav! Kako ste?</ChatMessage>
        <ChatMessage you={true}>Dobro sam. Kako ste vi?</ChatMessage>
        <ChatMessage you={false}>Super!</ChatMessage>
        {messages.map(message => <ChatMessage you={message.userId !== uuid}>{message.text}</ChatMessage>)}
      </div>
      
    </div>
  ) : <InactiveChatArea />
}

export default ChatArea;