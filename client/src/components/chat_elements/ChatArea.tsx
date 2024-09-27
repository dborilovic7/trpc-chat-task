import ChatMessage from "./ChatMessage";

const ChatArea = () => {
  return (
    <div id="chat-area-container" className="col-span-2 flex flex-col bg-bubbles rounded-r-xl">
      
      <div id="chat-area-header" className="flex justify-between items-center px-8 py-4 border-b border-black/25">
        <div id="chat-area-person" className="flex items-center">
          <img
            src="/src/assets/images/avatar-ph.png"
            alt="User profile picture"
            width={72}
            height={72}
            className="border-2 border-medium-ruby rounded-full"
          />
          
          <div id="chat-area-person-info" className="ml-2 text-black">
            <h3 className="text-2xl">Person Personic</h3>
            <p className="text-medium-ruby">Online</p>
          </div>
        </div>

        <div id="chat-area-actions">
          <p className="text-blue-500">✖</p>
        </div>
      </div>
      
      <div id="chat-area" className="w-full h-full p-8 text-xl leading-5 overflow-auto">
        <ChatMessage you={false}>Pozdrav! Kako ste?</ChatMessage>
        <ChatMessage>Dobro sam. Kako ste vi?</ChatMessage>
        <ChatMessage you={false}>Super!</ChatMessage>
        <ChatMessage you={false}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Voluptate a vitae omnis ea cupiditate sequi reprehenderit dolores possimus impedit quibusdam!
        </ChatMessage>
        <ChatMessage>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</ChatMessage>
      </div>
      
    </div>
  )
}

export default ChatArea;