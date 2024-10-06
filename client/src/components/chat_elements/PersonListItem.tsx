import { trpc } from "../../../trpc";
import type { PersonListItemPropTypes } from "../../../types";

const PersonListItem = ({
  uuid,
  person,
  setChatPartner,
  highlight,
  channelId,
  setPartnerToChannelMap,
  setChannelMessages,
  you
}: PersonListItemPropTypes) => {
  trpc.onMessage.useSubscription(channelId!, {
    enabled: !!channelId,
    onData(data) {
      setChannelMessages(prevMessages => {
        const newMessages = [...prevMessages[channelId!], data];
        return {...prevMessages, [channelId!]: newMessages};
      });
    }
  });

  trpc.onMessagesUpdate.useSubscription(channelId!, {
    enabled: !!channelId,
    onData(data) {
      setChannelMessages(prevMessages => ({...prevMessages, [channelId!]: data}));
    }
  });

  const getChannelDataMutation = trpc.getChannelData.useMutation({
    onSuccess(data) {
      const { channelId, messages } = data;
      const partnerId = person.id;
      setChatPartner(person);
      setPartnerToChannelMap(prevMap => ({...prevMap, [partnerId]: channelId}));
      setChannelMessages(prevMessages => ({...prevMessages, [channelId]: messages}));
    },
  });

  const handlePersonClick = () => {
    channelId
      ? setChatPartner(person)
      : getChannelDataMutation.mutate({ userId: uuid, partnerId: person.id });
  }

  const buttonHighlightClass = highlight ? " bg-bubbles text-medium-ruby font-semibold" : "";
  const imgHighlightClass = highlight ? "border-medium-ruby" : "border-black/25";
  const styles = you
    ? {
      border: "border-bubbles/20",
      nick: " italic"
    }
    : {
      border: "border-black/25",
      nick: ""
    }

  return (
    <li className="mb-4 last:mb-0">
      <button onClick={handlePersonClick} className={`flex justify-between items-center gap-2 w-full h-full
        border ${styles.border} rounded-xl px-2 sm:px-4 py-1 sm:py-2 shadow-md${buttonHighlightClass}`}>
        <img
          src="/src/assets/images/avatar-ph.png"
          alt="User profile picture"
          className={`border-2 ${imgHighlightClass} rounded-full w-18 h-18`}
        />
        <h3 className={`text-xl 2xl:text-2xl lg:ml-2${styles.nick}`}>{`${person.nickname}${you ? " (you)" : ""}`}</h3>
        <div className="w-4 2xl:w-18"></div>
      </button>
    </li>
  );
}

export default PersonListItem;