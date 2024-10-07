import PersonListItem from "./PersonListItem";
import HelpDialog from "../HelpDialog";
import type { PersonListPropTypes } from "../../../types";
import { useState } from "react";

const PersonList = ({
  uuid,
  personList,
  chatPartner,
  setChatPartner,
  partnerToChannelMap,
  setPartnerToChannelMap,
  setChannelMessages
}: PersonListPropTypes) => {
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);

  return (
    <div id="chat-person-list-container" className="flex flex-col bg-queen-blue sm:rounded-xl md:rounded-none
      md:col-span-2 lg:col-span-1">

      <div id="chat-person-list-header" className="flex justify-center items-center w-full
        p-4 sm:p-8 md:p-7.5 xl:p-8 2xl:p-10 border-b border-black/25">
        <h1 className="text-2xl sm:text-3xl xl:text-4xl text-center font-semibold">tRPChat</h1>
        <img src="/src/assets/icons/question.svg" onClick={() => setHelpDialogOpen(true)}
          className="inline w-6 h-6 ml-4 hover:cursor-pointer" />
      </div>

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
            you={person.id === uuid}
          />
        ))}
      </ul>

      <HelpDialog open={helpDialogOpen} setOpen={setHelpDialogOpen} />
    </div>
  );
}

export default PersonList;