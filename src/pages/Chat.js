import ChatDisplay from "../components/Chat/ChatDisplay";
import "../styles/Chat/ChatDisplay.css";

const Chat = ({ currentUser, isLoggedin, setIsLoggedin }) => {
  return (
    <main>
      <ChatDisplay
        currentUser={currentUser}
        isLoggedin={isLoggedin}
        setIsLoggedin={setIsLoggedin}
      />
    </main>
  );
};

export default Chat;
