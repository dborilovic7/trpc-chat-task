import ChatMessage from "./ChatMessage";
import InactiveChatArea from "./InactiveChatArea";

const ChatArea = () => {
  const active = true;

  return active ? (
    <div id="chat-area-container" className="md:flex flex-col bg-bubbles sm:rounded-xl md:rounded-none
      md:col-span-3 lg:col-span-2">
      
      <div id="chat-area-header" className="flex justify-between items-center border-b border-black/25
        px-4 py-2 sm:px-8 sm:py-4 xl:py-5">

        <div id="chat-area-person" className="flex items-center">
          <img
            src="/src/assets/images/avatar-ph.png"
            alt="User profile picture"
            className="border-2 border-medium-ruby rounded-full w-16 h-16 2xl:w-20 2xl:h-20"
          />
          
          <div id="chat-area-person-info" className="ml-2 text-black">
            <h3 className="text-2xl 2xl:text-3xl">Person Personic</h3>
            <p className="text-medium-ruby 2xl:text-lg">Online</p>
          </div>
        </div>

        <div id="chat-area-actions">
          <p className="text-blue-500">✖</p>
        </div>
      </div>
      
      <div id="chat-area" className="w-full h-chat-area-xs sm:h-chat-area-sm xl:h-chat-area-xl 2xl:h-chat-area-2xl
        p-4 sm:p-6 md:p-8 text-xl 2xl:text-2xl leading-5 2xl:leading-6 overflow-auto">
        <ChatMessage you={false}>Pozdrav! Kako ste?</ChatMessage>
        <ChatMessage>Dobro sam. Kako ste vi?</ChatMessage>
        <ChatMessage you={false}>Super!</ChatMessage>
        <ChatMessage you={false}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Voluptate a vitae omnis ea cupiditate sequi reprehenderit dolores possimus impedit quibusdam!
        </ChatMessage>
        <ChatMessage>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</ChatMessage>
        <ChatMessage>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam reprehenderit, architecto aut veniam, vel,
          tempora molestias dicta odit quas vero tempore modi voluptas earum doloribus exercitationem totam aliquid. Similique
          suscipit pariatur eius rerum explicabo culpa accusamus facere doloribus optio sequi amet commodi ullam laudantium, veniam
          ex vero deleniti quidem qui eveniet! Doloremque amet ipsum suscipit! Provident ea possimus quidem totam.</ChatMessage>
        <ChatMessage>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam reprehenderit, architecto aut veniam, vel,
          tempora molestias dicta odit quas vero tempore modi voluptas earum doloribus exercitationem totam aliquid. Similique
          suscipit pariatur eius rerum explicabo culpa accusamus facere doloribus optio sequi amet commodi ullam laudantium, veniam
          ex vero deleniti quidem qui eveniet! Doloremque amet ipsum suscipit! Provident ea possimus quidem totam.</ChatMessage>
        <ChatMessage>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam reprehenderit, architecto aut veniam, vel,
          tempora molestias dicta odit quas vero tempore modi voluptas earum doloribus exercitationem totam aliquid. Similique
          suscipit pariatur eius rerum explicabo culpa accusamus facere doloribus optio sequi amet commodi ullam laudantium, veniam
          ex vero deleniti quidem qui eveniet! Doloremque amet ipsum suscipit! Provident ea possimus quidem totam.</ChatMessage>
      </div>
      
    </div>
  ) : <InactiveChatArea />
}

export default ChatArea;