import ChatDisplay from "../components/Chat/ChatDisplay";
import ChatList from "../components/Chat/ChatList";
import ChatMember from "../components/Chat/ChatMember";
import "../styles/Chat/Chat.css";

const Chat = () => {
  return (
    <main className="chat">
      <div className="chat__container">
        <div className="chat__box">
          <ChatList />
        </div>
        {/* <div className="chat__box">
          <ChatDisplay />
        </div> */}
        <div className="chat__box">
          <ChatMember />
        </div>
      </div>
    </main>
  );
};

export default Chat;
