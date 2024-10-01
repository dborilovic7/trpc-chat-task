import PersonList from "./chat_elements/PersonList";
import ChatArea from "./chat_elements/ChatArea";

const Chat = ({nickname}: {nickname: string}) => {
  return (
    <div id="chat-app" className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-3 grid-rows-1 w-full h-full
      text-bubbles lg:rounded-xl lg:shadow-xl overflow-hidden">
      <PersonList />
      <ChatArea />
    </div>
  );
}

export default Chat;