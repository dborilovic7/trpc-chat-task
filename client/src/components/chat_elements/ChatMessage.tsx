import { ReactNode } from "react";

const ChatMessage = ({you=true, children}: { you?: boolean, children: ReactNode}) => {
  const color = you ? "queen-blue" : "medium-ruby";
  const reverseClass = you ? "flex-row-reverse" : "";

  return (
    <div className={`chat-message flex ${reverseClass} gap-2 items-end mb-2 last:mb-0`}>
      <img
        src="/src/assets/images/avatar-ph.png"
        alt="User profile picture"
        width={36}
        height={36}
        className={`border border-${color} rounded-full`}
      />
      <p className={`p-2 bg-${color} rounded-xl shadow-sm max-w-[80%]`}>{children}</p>
    </div>
  );
}

export default ChatMessage;