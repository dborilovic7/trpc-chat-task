import { ReactNode } from "react";

const ChatMessage = ({you=true, children}: { you?: boolean, children: ReactNode}) => {
  const styles = you
  ? {
    reverseClass: "flex-row-reverse",
    borderColor: "border-queen-blue",
    backgroundColor: "bg-queen-blue"
  }
  : {
    reverseClass: "",
    borderColor: "border-medium-ruby",
    backgroundColor: "bg-medium-ruby"
  }

  return (
    <div className={`chat-message flex ${styles.reverseClass} gap-2 items-end mb-2 last:mb-0`}>
      <img
        src="/src/assets/images/avatar-ph.png"
        alt="User profile picture"
        width={36}
        height={36}
        className={`border ${styles.borderColor} rounded-full`}
      />
      <p className={`p-2 ${styles.backgroundColor} rounded-xl shadow-sm max-w-[80%]`}>
        {children}
      </p>
    </div>
  );
}

export default ChatMessage;