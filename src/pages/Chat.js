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

  return (
    <main className="chat">
      <div className="chat__container">
        <div className="chat__box">
          <ChatList onSelectChatRoom={handleSelectChatRoom} />
        </div>
        {selectedChatRoom && (
          <>
            <div className="chat__box chat__box--display">
              <ChatDisplay
                key={selectedChatRoom.chatRoomId}
                chatRoom={selectedChatRoom}
              />
            </div>
            <div className="chat__box">
              <ChatMember chatRoom={selectedChatRoom} />
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Chat;
