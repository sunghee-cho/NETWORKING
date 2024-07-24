import { useState } from "react";
import ChatDisplay from "../components/Chat/ChatDisplay";
import ChatList from "../components/Chat/ChatList";
import ChatMember from "../components/Chat/ChatMember";
import "../styles/Chat/Chat.css";

const Chat = () => {
  const [selectedChatRoom, setSelectedChatRoom] = useState(null);

  const handleSelectChatRoom = (chatRoom) => {
    setSelectedChatRoom(chatRoom);
  };

  const handleLeaveChatRoom = () => {
    setSelectedChatRoom(null);
  };

  return (
    <main className="chat">
      <section className="chat__container">
        <article className="chat__box chat__box--list">
          <ChatList onSelectChatRoom={handleSelectChatRoom} />
        </article>
        {selectedChatRoom && (
          <>
            <article className="chat__box chat__box--display">
              <ChatDisplay
                key={selectedChatRoom.chatRoomId}
                chatRoom={selectedChatRoom}
                onLeave={handleLeaveChatRoom}
              />
            </article>
            <article className="chat__box chat__box--member">
              <ChatMember chatRoom={selectedChatRoom} onLeave={handleLeaveChatRoom} />
            </article>
          </>
        )}
      </section>
    </main>
  );
};

export default Chat;
