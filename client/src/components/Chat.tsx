import { useEffect, useState } from "react";
import { trpc } from "../../trpc";
import PersonList from "./chat_elements/PersonList";
import ChatArea from "./chat_elements/ChatArea";
import type { Message, User } from "../../../server/types";

const Chat = ({uuid}: {uuid: string}) => {
  const [personList, setPersonList] = useState<User[]>([]);
  const [chatPartner, setChatPartner] = useState<User|null>(null);
  const [partnerToChannelMap, setPartnerToChannelMap] = useState<{[key: string]: string}>({});
  const [channelMessages, setChannelMessages] = useState<{[key:string]: Message[]}>({});

  const chatPartnerId = chatPartner?.id;
  const channelId = chatPartnerId ? partnerToChannelMap[chatPartnerId] : null;
  const messages = channelId ? channelMessages[channelId] : [];

  useEffect(() => {
    document.title = chatPartner ? `${chatPartner.nickname} | tRPChat` : "tRPChat";
  }, [chatPartner]);

  trpc.getUsers.useQuery(uuid, {
    onSuccess(data) {
      setPersonList(data);
    },
  });

  trpc.onUsersUpdate.useSubscription(uuid, {
    onData(data) {
      setPersonList(() => {
        const newChatPartner = data.find(partner => partner.id === chatPartner?.id);
        newChatPartner && setChatPartner(newChatPartner);
        return data;
      });
    }
  });

  return (
    <div id="chat-app" className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-3 grid-rows-1 w-full h-full
      text-bubbles lg:rounded-xl lg:shadow-xl overflow-hidden">
      <PersonList
        uuid={uuid}
        personList={personList}
        chatPartner={chatPartner}
        setChatPartner={setChatPartner}
        partnerToChannelMap={partnerToChannelMap}
        setPartnerToChannelMap={setPartnerToChannelMap}
        setChannelMessages={setChannelMessages}
      />
      <ChatArea
        uuid={uuid}
        chatPartner={chatPartner}
        setChatPartner={setChatPartner}
        channelId={channelId}
        messages={messages}
      />
    </div>
  );
}

export default Chat;