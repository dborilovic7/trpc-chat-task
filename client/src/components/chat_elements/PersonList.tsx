import PersonListItem from "./PersonListItem";

const PersonList = () => {
  return (
    <div id="chat-person-list-container" className="flex flex-col bg-queen-blue rounded-l-xl">
      <h2 className="self-center w-full p-8 text-4xl text-center font-semibold border-b border-black/25">Chat</h2>
      <ul id="chat-person-list" className="p-8 h-full overflow-auto">
        <PersonListItem />
        <PersonListItem />
        <PersonListItem />
      </ul>
    </div>
  );
}

export default PersonList;