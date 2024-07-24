import "../../styles/Chat/ChatList.css";
import { useState, useEffect } from "react";
import NewChat from "./NewChat";
import Modal from "react-modal";
import Cookies from "js-cookie";

Modal.setAppElement("#root");

const ChatList = ({ onSelectChatRoom }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedChatRoom, setSelectedChatRoom] = useState(null);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  // 채팅방 리스트 가져오기
  const fetchChatRooms = async () => {
    const token = Cookies.get("accessToken");

    try {
      const response = await fetch("/api/chat/rooms/group", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setChatRooms(data);
      } else {
        console.error("채팅방을 가져오지 못하였습니다.");
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  useEffect(() => {
    fetchChatRooms();
  }, []);

  // modal 열기
  const openModal = () => {
    setIsOpen(true);
  };

  // modal 닫기
  const closeModal = () => {
    setIsOpen(false);
  };

  // 채팅방 클릭 시에 active상태인지 확인하기 -- active 상태면 채팅방 열기 & inactive 상태면 modal 열기
  const handleChatRoomClick = async (chatRoom) => {
    console.log("Selected Chat Room: ", chatRoom);
    const token = Cookies.get("accessToken");

    try {
      const response = await fetch(
        `/api/chat/users/${chatRoom.chatRoomId}/isActive`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("User isActive data: ", data);
        setNickname(""); // 닉네임 리셋하기
        setPassword(""); // 비번 리셋하기
        setPasswordError(false); // 에러메세지 리셋하기
        if (data.isActive) {
          if (chatRoom.secret) {
            console.log("This is a secret room.");
            setSelectedChatRoom(chatRoom);
            setShowJoinModal(true);
          } else {
            console.log("This is not a secret room.");
            setSelectedChatRoom(chatRoom);
            onSelectChatRoom(chatRoom); // 채팅방 선택에 따라 바뀜
          }
        } else {
          console.log("User is not active in this room.");
          setSelectedChatRoom(chatRoom);
          setShowJoinModal(true);
        }
      } else {
        console.error("채팅방에 참가한 유저인지 확인하지 못하였습니다.");
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  // 채팅방에 들어가기
  const handleJoinChat = async () => {
    if (selectedChatRoom.secret && !password) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);

    const token = Cookies.get("accessToken");

    try {
      const response = await fetch(
        `/api/chat/users/join/${selectedChatRoom.chatRoomId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ nickname, password }),
        }
      );

      if (response.ok) {
        setShowJoinModal(false);
        onSelectChatRoom(selectedChatRoom);
      } else {
        console.error("채팅방 참여에 실패하였습니다.");
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div className="chat-list__wrapper">
        <div className="chat-list__group">
          <button className="chat-list__button">전체 채팅방</button>
          <button className="chat-list__button">나의 채팅방</button>
        </div>
        <ul className="chat-list__u-list">
          {chatRooms.map((chatRoom) => (
            <li
              className="chat-list__list"
              onClick={() => handleChatRoomClick(chatRoom)}
              key={chatRoom.chatRoomId}
            >
              <div className="chat-room-name">{chatRoom.roomName}</div>
              <div className="chat-room-hashtags">
                {(chatRoom.hashtag || "").split(",").map((tag, index) => (
                  <span key={index} className="chat-room-hashtag">
                    {tag.trim()}
                  </span>
                ))}
              </div>
              <div className="chat-list__line"></div>
            </li>
          ))}
        </ul>
        <div className="chat-list__group">
          <button className="chat-list__button" onClick={openModal}>
            채팅 시작하기
          </button>
        </div>
        <article className="chat-list__holder">
          <NewChat
            isOpen={isOpen}
            closeModal={closeModal}
            className="chat-list__modal"
            fetchChatRooms={fetchChatRooms} // 비밀번호 넘기기
          />
        </article>
      </div>
      <Modal
        isOpen={showJoinModal}
        onRequestClose={() => {
          setShowJoinModal(false);
          setNickname("");
          setPassword("");
          setPasswordError(false);
        }}
        className="chat-list__modal"
      >
        <h2 className="chat-list__title">채팅에 참여하시겠습니까?</h2>
        {selectedChatRoom && (
          <>
            {selectedChatRoom.secret && (
              <div className="chat-list__wrapper">
                <p className="chat-list__subtitle">비밀번호:</p>
                <input
                  className="chat-list__input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && (
                  <p className="error-message">비밀번호를 입력하세요.</p>
                )}
              </div>
            )}
            <div className="chat-list__wrapper">
              <p className="chat-list__subtitle">닉네임:</p>
              <input
                className="chat-list__input"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
            <button className="chat-list__button" onClick={handleJoinChat}>
              참여하기
            </button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default ChatList;
