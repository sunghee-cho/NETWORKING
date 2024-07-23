import "../../styles/Chat/ChatMember.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import profilePic from "../../assets/images/고양이 프로필.png";

const ChatMember = ({ chatRoom }) => {
  const [members, setMembers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchChatMembers = async () => {
      const token = Cookies.get("accessToken");
      if (!token) {
        console.error("No token found.");
        return;
      }

      try {
        const response = await fetch(
          `/api/chat/users/room/${chatRoom.chatRoomId}/members`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("참여 유저:", data);
          setMembers(data.participants);
          const currentUserId = data.currentUser;
          const currentUser = data.participants.find(
            (member) => member.userId === currentUserId
          );
          setCurrentUser(currentUser);
        } else {
          console.error("채팅 참가 유저 불러오기에 실패하였습니다.");
        }
      } catch (error) {
        console.error("애러 발생:", error);
      }
    };

    if (chatRoom) {
      fetchChatMembers();
    }
  }, [chatRoom]);

  return (
    <div>
      <ul className="chat-member__list">
        {currentUser && (
          <li className="chat-member__holder">
            <div>
              <img
                className="chat-member__pic"
                src={profilePic}
                alt="프로필사진"
                style={{ borderRadius: "50%", marginRight: "10px" }}
              />
            </div>
            <div className="chat-member__nickname">{currentUser.nickname}</div>
          </li>
        )}
      </ul>
      <hr />
      <div>
        <p>참여 {members.length}명</p>{" "}
      </div>
      <ul className="chat-member__ul">
        {members
          .filter((member) => member.userId !== currentUser?.userId)
          .map((member) => (
            <li className="chat-member__holder" key={member.userId}>
              <div>
                <img
                  className="chat-member__pic"
                  src={profilePic}
                  alt="프로필사진"
                  style={{ borderRadius: "50%", marginRight: "10px" }}
                />
              </div>
              <div className="chat-member__nickname">{member.nickname}</div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ChatMember;
