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

  useEffect(() => {
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

    fetchChatRooms();
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChatRoomClick = async (chatRoom) => {
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

  const handleJoinChat = async () => {
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
      <div>
        <button>전체 채팅방</button>
        <button>나의 채팅방</button>
        <ul>
          {chatRooms.map((chatRoom) => (
            <li
              key={chatRoom.chatRoomId}
              onClick={() => handleChatRoomClick(chatRoom)}
            >
              {chatRoom.roomName}
            </li>
          ))}
        </ul>
        <button onClick={openModal}>채팅방 만들기</button>
        <article>
          <NewChat isOpen={isOpen} closeModal={closeModal} />
        </article>
      </div>
      <Modal
        isOpen={showJoinModal}
        onRequestClose={() => setShowJoinModal(false)}
      >
        <h2>채팅에 참여하시겠습니까?</h2>
        {selectedChatRoom && selectedChatRoom.isSecret && (
          <div>
            <p>비밀번호:</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}
        <div>
          <p>닉네임:</p>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <button onClick={handleJoinChat}>참여하기</button>
      </Modal>
    </div>
  );
};

export default ChatList;
