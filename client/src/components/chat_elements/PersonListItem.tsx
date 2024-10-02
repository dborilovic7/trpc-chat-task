const PersonListItem = ({nickname}: {nickname: string}) => {
  return (
    <li className="flex justify-between items-center gap-2 border border-black/25 rounded-xl
      mb-4 last:mb-0 px-2 sm:px-4 py-1 sm:py-2 shadow-md">
      <img
        src="/src/assets/images/avatar-ph.png"
        alt="User profile picture"
        className="border-2 border-black/25 rounded-full w-18 h-18"
      />
      <h3 className="text-xl 2xl:text-2xl lg:ml-2">{nickname}</h3>
      <div className="w-4 2xl:w-18"></div>
    </li>
  );
}

export default PersonListItem;