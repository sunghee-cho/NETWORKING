import { useState, useEffect } from "react";
import NewChat from "./NewChat";
import ChatDisplay from "./ChatDisplay";
import Modal from "react-modal";
import Cookies from "js-cookie"; // Import js-cookie to get the token

Modal.setAppElement("#root");

export default function ChatList() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedChatRoom, setSelectedChatRoom] = useState(null);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    // Function to fetch group chat rooms
    const fetchChatRooms = async () => {
      const token = Cookies.get("accessToken"); // Retrieve the token from cookies

      try {
        const response = await fetch("/api/chat/rooms/group", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

        if (response.ok) {
          const data = await response.json();
          setChatRooms(data); // Store fetched chat rooms in state
        } else {
          console.error("Failed to fetch chat rooms.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
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
    const token = Cookies.get("accessToken"); // Retrieve the token from cookies

    try {
      const response = await fetch(
        `/api/chat/users/${chatRoom.chatRoomId}/isParticipant`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.isJoined) {
          setSelectedChatRoom(chatRoom);
          setIsJoined(true);
        } else {
          setSelectedChatRoom(null);
          setShowJoinModal(true);
        }
      } else {
        console.error("Failed to check if user is joined.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleJoinChat = async () => {
    const token = Cookies.get("accessToken"); // Retrieve the token from cookies

    try {
      const response = await fetch(
        `/api/chat/users/join/${selectedChatRoom.chatRoomId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
          body: JSON.stringify({ nickname, password }),
        }
      );

      if (response.ok) {
        setIsJoined(true);
        setShowJoinModal(false);
      } else {
        console.error("Failed to join chat room.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div>
        <button>전체 채팅방</button>
        <button>나의 채팅방</button>
        {/* Map through chatRooms state to render list of chat rooms */}
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
      <div style={{ marginLeft: "20px", flexGrow: 1 }}>
        {isJoined && selectedChatRoom && (
          <ChatDisplay chatRoom={selectedChatRoom} />
        )}
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
}
