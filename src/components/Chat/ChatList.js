import "../../styles/Chat/ChatList.css";
import { useState, useEffect } from "react";
import NewChat from "./NewChat";
import Modal from "react-modal";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

Modal.setAppElement("#root");

const ChatList = ({ onSelectChatRoom }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedChatRoom, setSelectedChatRoom] = useState(null);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [nicknameError, setNicknameError] = useState(false);
  const [showMyChatRooms, setShowMyChatRooms] = useState(false);

  //채팅방 가져오기
  const fetchChatRooms = async (myRooms) => {
    const token = Cookies.get("accessToken");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.uno;

    console.log("Decoded Token: ", decodedToken);
    console.log("User ID: ", userId);

    const url = myRooms
      ? `/api/chat/rooms/my?userId=${userId}`
      : "/api/chat/rooms/group";

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
        const filteredChatRooms = data.filter((chatRoom) => {
          if (showMyChatRooms) {
            const participant = chatRoom.participants.find(
              (p) => p.userId == userId
            );
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
        setNicknameError(false); // 에러메세지 리셋하기
        if (data.isActive) {
          setSelectedChatRoom(chatRoom);
          onSelectChatRoom(chatRoom); // 채팅방 선택에 따라 바뀜
        } else {
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

  // 채팅 참여하기
  const handleJoinChat = async () => {
    let hasError = false;

    if (selectedChatRoom.secret && !password) {
      setPasswordError(true);
      hasError = true;
    } else {
      setPasswordError(false);
    }

    if (!nickname) {
      setNicknameError(true);
      hasError = true;
    } else {
      setNicknameError(false);
    }

    if (hasError) {
      return;
    }

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
        // 선택된 채팅방으로 설정하고 onSelectChatRoom 콜백 부르기
        onSelectChatRoom(selectedChatRoom);
        setSelectedChatRoom(selectedChatRoom);
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
          <div className="chat-list__group">
            <button className="chat-list__button" onClick={openModal}>
              채팅방 만들기
            </button>
          </div>
        </div>
        <div className="chat-list__line"></div>
        <ul className="chat-list__u-list">
          {chatRooms.map((chatRoom) => (
            <li
              className={`chat-list__list ${
                chatRoom.chatRoomId === selectedChatRoom?.chatRoomId
                  ? "selected"
                  : ""
              }`}
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
          setNicknameError(false);
        }}
        className="chat-list__modal"
      >
        <h3 className="chat-list__title">채팅방에 참여하시겠습니까?</h3>
        {selectedChatRoom && (
          <>
            {selectedChatRoom.secret && (
              <div className="chat-list__wrapper chat-list__wrapper--pw">
                <p className="chat-list__subtitle">
                  **이 채팅방은 비밀방입니다.**
                </p>
                <input
                  className="chat-list__input"
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && (
                  <p className="error-message">비밀번호를 입력하세요.</p>
                )}
              </div>
            )}
            <div className="chat-list__wrapper">
              <input
                className="chat-list__input"
                type="text"
                placeholder="닉네임을 입력해주세요."
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              {nicknameError && (
                <p className="error-message">닉네임을 입력하세요.</p>
              )}
            </div>
            <button
              className="chat-list__button--join"
              onClick={handleJoinChat}
            >
              참여하기
            </button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default ChatList;
