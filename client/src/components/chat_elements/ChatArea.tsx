import { useState, ChangeEvent, MouseEvent } from "react";
import { trpc } from "../../../trpc";
import ChatMessage from "./ChatMessage";
import InactiveChatArea from "./InactiveChatArea";
import type { ChatAreaPropTypes } from "../../../types";

const ChatArea = ({
  uuid,
  chatPartner,
  setChatPartner,
  channelId,
  messages
}: ChatAreaPropTypes) => {
  const [messageInput, setMessageInput] = useState("");
  const filteredMessage = messageInput.trim();

  const messageMutation = trpc.message.useMutation({});

  const sendMessage = (e: MouseEvent) => {
    e.preventDefault();

    const message = {
      userId: uuid,
      channelId: channelId!,
      text: filteredMessage
    }

    messageMutation.mutate(message);
    setMessageInput("");
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMessageInput(value);
  }

  const you = chatPartner?.id === uuid;
  const sendButtonDisabled = filteredMessage.length < 1;
  const sendButtonStyle = sendButtonDisabled ? "bg-medium-ruby/70" : "bg-medium-ruby";

  return chatPartner && channelId ? (
    <div id="chat-area-container" className="flex flex-col bg-bubbles sm:rounded-xl md:rounded-none
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
            <h3 className="text-2xl 2xl:text-3xl">{`${chatPartner.nickname}${you ? " (you)" : ""}`}</h3>
            <p className="text-medium-ruby 2xl:text-lg">Online</p>
          </div>
        </div>

        <button id="close-chat" className="w-10 h-10" onClick={() => setChatPartner(null)}>
          <img src="/src/assets/icons/close.svg" alt="Close icon" />
        </button>
      </div>
      
      <div id="chat-area" className="w-full h-chat-area-xs sm:h-chat-area-sm xl:h-chat-area-xl 2xl:h-chat-area-2xl
        p-4 sm:p-6 md:p-8 text-xl 2xl:text-2xl leading-5 2xl:leading-6 overflow-auto">
        {messages.map((message, i) => (
          <ChatMessage key={`m${i}`} you={message.userId === uuid} think={!!message.thinkStyling}>{message.text}</ChatMessage>
        ))}
      </div>

      <form className="flex border-t border-black/25">
        <input type="text" value={messageInput} onChange={handleChange} className="w-5/6 p-3 text-black 2xl:text-lg
          sm:rounded-bl-xl md:rounded-none" />
        <button
          onClick={sendMessage}
          disabled={sendButtonDisabled}
          className={`flex-auto ${sendButtonStyle} 2xl:text-lg font-semibold sm:rounded-br-xl md:rounded-none`}
        >
          Send
        </button>
      </form>
      
    </div>
  ) : <InactiveChatArea />
}

export default ChatArea;