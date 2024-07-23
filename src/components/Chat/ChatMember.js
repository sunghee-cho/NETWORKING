import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const ChatMember = ({ chatRoom }) => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchChatMembers = async () => {
      const token = Cookies.get("accessToken");
      if (!token) {
        console.error("No token found.");
        return;
      }

      try {
        const response = await fetch(
          `/api/chat/rooms/${chatRoom.chatRoomId}/members`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setMembers(data);
        } else {
          console.error("Failed to fetch chat members.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    if (chatRoom) {
      fetchChatMembers();
    }
  }, [chatRoom]);

  return (
    <div>
      <div>
        <p>내프로필</p>
      </div>
      <ul>
        {members.map((member) => (
          <li key={member.userId}>
            <img
              src="https://via.placeholder.com/50"
              alt="Profile"
              style={{ borderRadius: "50%", marginRight: "10px" }}
            />
            {member.nickname}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatMember;
