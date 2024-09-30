const InactiveChatArea = () => {
  return (
    <div id="inactive-chat-area-container" className="hidden md:flex justify-center items-center w-full h-full
    md:col-span-3 lg:col-span-2 bg-bubbles p-4 sm:p-8 shadow-inner-ruby">
      <p className="text-5xl lg:text-6xl xl:text-7xl text-medium-ruby/40 md:leading-[6rem] lg:leading-[8rem]
        xl:leading-[10rem]">
        Select a person on the left to start chatting with them.
      </p>
    </div>
  );
}

export default InactiveChatArea;