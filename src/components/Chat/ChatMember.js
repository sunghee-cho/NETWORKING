import "../../styles/Chat/ChatMember.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import profilePic from "../../assets/images/고양이 프로필.png";

const ChatMember = ({ chatRoom, onLeave }) => {
  const [members, setMembers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLeaveModal, setShowLeaveModal] = useState(false);

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

  const handleLeave = async () => {
    const token = Cookies.get("accessToken");
    if (!token) {
      console.error("저장된 토큰이 없습니다.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/chat/users/room/${chatRoom.chatRoomId}/user/${currentUser.userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        onLeave();
      } else {
        console.error("사용자를 채팅방에서 제거하는 데 실패했습니다.");
      }
    } catch (error) {
      console.error(
        "사용자를 채팅방에서 제거하는 중 오류가 발생했습니다.",
        error
      );
    }
  };

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
      <div className="chat-member__line"></div>
      <div className="chat-member__group">
        <div>
          <p className="chat-member__count">참여 {members.length}명</p>{" "}
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
      <button
        className="chat-member__leave-button"
        onClick={() => setShowLeaveModal(true)}
      >
        나가기
      </button>

      {showLeaveModal && (
        <div className="chat-member__modal">
          <div className="chat-member__modal-content">
            <h3 className="chat-member__title">채팅방을 나가시겠습니까?</h3>
            <div className="chat-member__modal-wrapper">
              <button className="chat-member__button" onClick={handleLeave}>
                예
              </button>
              <button
                className="chat-member__button"
                onClick={() => setShowLeaveModal(false)}
              >
                아니요
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMember;
