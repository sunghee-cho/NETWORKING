import "../../styles/Chat/ChatList.css";
import { useState, useEffect } from "react";
import NewChat from "./NewChat";
import Modal from "react-modal";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

Modal.setAppElement("#root");

const ChatList = ({ onSelectChatRoom }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedChatRoom, setSelectedChatRoom] = useState(null);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [showMyChatRooms, setShowMyChatRooms] = useState(false);

  //채팅방 가져오기
  const fetchChatRooms = async (myRooms) => {
    const token = Cookies.get("accessToken");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.uno;

    console.log("Decoded Token: ", decodedToken);
    console.log("User ID: ", userId);

    const url = myRooms ? `/api/chat/rooms/my?userId=${userId}` : "/api/chat/rooms/group";

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched Chat Rooms: ", data);

        // inactive 상태인 유저 필터링하기 
        const filteredChatRooms = data.filter(chatRoom => {
          if (showMyChatRooms) {
            const participant = chatRoom.participants.find(p => p.userId == userId);
            return participant && participant.isActive;
          }
          return true;
        });

        console.log("Filtered Chat Rooms: ", filteredChatRooms);
        setChatRooms(filteredChatRooms);
      } else {
        console.error("채팅방을 가져오지 못하였습니다.");
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  useEffect(() => {
    fetchChatRooms(showMyChatRooms);
  }, [showMyChatRooms]);

  // modal 열기
  const openModal = () => {
    setIsOpen(true);
  };

  // modal 닫기
  const closeModal = () => {
    setIsOpen(false);
  };

  // 채팅방 클릭 핸들해주는 function
  const handleChatRoomClick = async (chatRoom) => {
    const token = Cookies.get("accessToken");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.uno;

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
        setNickname(""); // 닉네임 리셋하기
        setPassword(""); // 비번 리셋하기
        setPasswordError(false); // 에러메세지 리셋하기
        if (data.isActive) {
          setSelectedChatRoom(chatRoom);
          onSelectChatRoom(chatRoom); // 채팅방 선택에 따라 바뀜
        } else {
          if (chatRoom.secret) {
            setSelectedChatRoom(chatRoom);
            setShowJoinModal(true);
          } else {
            setSelectedChatRoom(chatRoom);
            onSelectChatRoom(chatRoom);
          }
        }
      } else {
        console.error("채팅방에 참가한 유저인지 확인하지 못하였습니다.");
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  // 채팅 참여하기
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
        // 채팅방 다시 불러와서 리스트 업데이트하기 
        fetchChatRooms(showMyChatRooms);
      } else {
        console.error("채팅방 참여에 실패하였습니다.");
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  // 내 채팅방 핸들해주는 function
  const handleMyChatRoomsClick = () => {
    setShowMyChatRooms(!showMyChatRooms);
  };

  return (
    <div style={{ display: "flex" }}>
      <div className="chat-list__wrapper">
        <div className="chat-list__group">
          <button
            className="chat-list__button"
            onClick={handleMyChatRoomsClick}
          >
            {showMyChatRooms ? "전체 채팅방" : "나의 채팅방"}
          </button>
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
