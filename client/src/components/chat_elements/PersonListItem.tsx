const PersonListItem = () => {
  return (
    <li className="flex justify-between items-center gap-2 border border-black/25 rounded-xl
      mb-4 last:mb-0 px-4 py-2 shadow-md">
      <img
        src="/src/assets/images/avatar-ph.png"
        alt="User profile picture"
        width={72}
        height={72}
        className="col-span-2 border-2 border-black/25 rounded-full"
      />
      <h3 className="col-span-3 text-2xl">Person Personic</h3>
      <div></div>
    </li>
  );
}

export default PersonListItem;