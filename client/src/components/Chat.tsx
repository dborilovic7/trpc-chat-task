import { useState } from "react";
import { trpc } from "../../trpc";
import PersonList from "./chat_elements/PersonList";
import ChatArea from "./chat_elements/ChatArea";
import type { User } from "../../../server/types";

const Chat = ({uuid}: {uuid: string}) => {
  const [personList, setPersonList] = useState<User[]>([]);

  trpc.getUsers.useQuery(uuid, {
    onSuccess(data) {
      setPersonList(data);
    },
  });

  trpc.onUsersUpdate.useSubscription(uuid, {
    onData(data) {
      setPersonList(data);
    }
  });

  return (
    <div id="chat-app" className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-3 grid-rows-1 w-full h-full
      text-bubbles lg:rounded-xl lg:shadow-xl overflow-hidden">
      <PersonList personList={personList} />
      <ChatArea />
    </div>
  );
}

export default Chat;