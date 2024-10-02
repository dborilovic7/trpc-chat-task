import { Dispatch, SetStateAction } from "react";
import type { User } from "../../../../server/types";

type PersonListItemPropTypes = {
  person: User;
  setChatPartner: Dispatch<SetStateAction<User|null>>;
  highlight: boolean;
}

const PersonListItem = ({person, setChatPartner, highlight}: PersonListItemPropTypes) => {
  const buttonHighlightClass = highlight ? " bg-bubbles text-medium-ruby font-semibold" : "";
  const imgHighlightClass = highlight ? "border-medium-ruby" : "border-black/25";

  return (
    <li>
      <button onClick={() => setChatPartner(person)} className={`flex justify-between items-center gap-2 w-full h-full border border-black/25
        rounded-xl mb-4 last:mb-0 px-2 sm:px-4 py-1 sm:py-2 shadow-md${buttonHighlightClass}`}>
        <img
          src="/src/assets/images/avatar-ph.png"
          alt="User profile picture"
          className={`border-2 ${imgHighlightClass} rounded-full w-18 h-18`}
        />
        <h3 className="text-xl 2xl:text-2xl lg:ml-2">{person.nickname}</h3>
        <div className="w-4 2xl:w-18"></div>
      </button>
    </li>
  );
}

export default PersonListItem;