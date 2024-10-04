import PersonListItem from "./PersonListItem";
import { Dispatch, SetStateAction } from "react";
import type { Message, User } from "../../../../server/types";

type PersonListPropTypes = {
  uuid: string;
  personList: User[];
  chatPartner: User|null;
  setChatPartner: Dispatch<SetStateAction<User|null>>;
  partnerToChannelMap: {[key: string]: string};
  setPartnerToChannelMap: Dispatch<SetStateAction<{[key: string]: string}>>;
  setChannelMessages: Dispatch<SetStateAction<{[key:string]: Message[]}>>;
}

const PersonList = ({
  uuid,
  personList,
  chatPartner,
  setChatPartner,
  partnerToChannelMap,
  setPartnerToChannelMap,
  setChannelMessages
}: PersonListPropTypes) => {
  return (
    <div id="chat-person-list-container" className="flex flex-col bg-queen-blue sm:rounded-xl md:rounded-none
      md:col-span-2 lg:col-span-1">

      <h1 className="self-center w-full p-4 sm:p-8 md:p-7.5 xl:p-8 2xl:p-10 text-2xl sm:text-3xl lg:text-3xl xl:text-4xl
        text-center font-semibold border-b border-black/25">tRPChat</h1>

      <ul id="chat-person-list" className="p-4 sm:px-16 sm:py-8 md:p-8 h-full overflow-auto">
        {personList.map((person, i) => (
          <PersonListItem
            key={`p${i}`}
            uuid={uuid}
            person={person}
            setChatPartner={setChatPartner}
            highlight={person.id === chatPartner?.id}
            channelId={partnerToChannelMap[person.id]}
            setPartnerToChannelMap={setPartnerToChannelMap}
            setChannelMessages={setChannelMessages}
          />
        ))}
      </ul>
    </div>
  );
}

export default PersonList;