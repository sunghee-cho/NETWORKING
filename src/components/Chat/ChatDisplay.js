import "../../styles/Chat/ChatDisplay.css";
import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import Cookies from "js-cookie";
import debounce from "lodash.debounce";

const ChatDisplay = ({ chatRoom, onLeave }) => {
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(null);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const stompClient = useRef(null);

  const fetchUserInfo = async (token, chatRoomId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/users/infoWithNickname?chatRoomId=${chatRoomId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setUserId(data.no);
      setNickname(data.nickname);
    } catch (error) {
      console.error("유저 정보를 불러오지 못했습니다.:", error);
    }
  };

  const fetchMessages = async (token, chatRoomId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/chat/messages/room/${chatRoomId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      const normalizedMessages = data.map((msg) => ({
        ...msg,
        content: msg.message,
        sender: msg.nickname, 
        type: msg.type || "GROUP_CHAT"
      }));
      setMessages(normalizedMessages);
    } catch (error) {
      console.error("메세지를 불러오지 못했습니다.:", error);
    }
  };

  const connect = () => {
    const token = Cookies.get("accessToken");
    const socket = new SockJS(`http://localhost:8080/chat?token=${token}`);
    stompClient.current = Stomp.over(socket);
    stompClient.current.connect(
      {},
      (frame) => {
        console.log("연결성공: " + frame);

        stompClient.current.subscribe(
          `/topic/groupChatRoom/${chatRoom.chatRoomId}`,
          (message) => {
            const newMessage = JSON.parse(message.body);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          }
        );

        stompClient.current.send(
          `/app/chat.addUser/${chatRoom.chatRoomId}`,
          {},
          JSON.stringify({ sender: nickname, userId })
        );
      },
      (error) => {
        console.error("웹소켓 연결에 실패하였습니다.", error);
      }
    );
  };

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token && chatRoom) {
      fetchUserInfo(token, chatRoom.chatRoomId);
      fetchMessages(token, chatRoom.chatRoomId);

      const checkActiveStatus = async () => {
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
            if (!data.isActive) {
              setShowJoinModal(true);
            } else {
              setIsJoined(true);
            }
          } else {
            console.error("유저 활성 상태를 확인하지 못하였습니다.");
          }
        } catch (error) {
          console.error("에러 발생:", error);
        }
      };

      checkActiveStatus();
    }
  }, [chatRoom]);

  useEffect(() => {
    if (chatRoom && nickname && userId && isJoined) {
      connect();
    }

    return () => {
      if (stompClient.current) {
        stompClient.current.disconnect(() => {
          console.log("연결이 종료되었습니다.");
        });
      }
    };
  }, [chatRoom, nickname, userId, isJoined]);

  const sendMessage = () => {
    if (stompClient.current && message.trim() !== "") {
      const chatMessage = {
        sender: nickname,
        content: message,
        type: "GROUP_CHAT",
        userId: userId,
        chatRoomId: chatRoom.chatRoomId,
      };
      stompClient.current.send(
        `/app/chat.sendMessage/${chatRoom.chatRoomId}`,
        {},
        JSON.stringify(chatMessage)
      );
      setMessage("");
    } else {
      console.error("STOMP client 연결에 실패하였습니다.");
    }
  };

  const handleDeleteMessage = async () => {
    const token = Cookies.get("accessToken");
    if (!token) {
      console.error("저장된 토큰이 없습니다.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/chat/messages/${selectedMessage}/soft-delete`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg.chatId !== selectedMessage)
        );
        setShowDeleteModal(false);
      } else {
        console.error("메세지를 삭제하는 데 실패했습니다.");
      }
    } catch (error) {
      console.error("메세지를 삭제하는 중 오류가 발생했습니다:", error);
    }
  };

  const handleLeave = async () => {
    const token = Cookies.get("accessToken");
    if (!token) {
      console.error("저장된 토큰이 없습니다.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/chat/users/room/${chatRoom.chatRoomId}/user/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        if (stompClient.current) {
          stompClient.current.disconnect(() => {
            console.log("연결이 종료되었습니다.");
          });
        }
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

  const handleKeyDown = debounce((e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  }, 300);

  const confirmJoinChatRoom = async () => {
    setShowJoinModal(false);
    const token = Cookies.get("accessToken");
    const payload = {
      nickname,
      password: "",
    };
    try {
      const response = await fetch(
        `http://localhost:8080/api/chat/users/join/${chatRoom.chatRoomId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("유저가 들어왔습니다:", data);
        setUserId(data.userId);
        setIsJoined(true);
        fetchUserInfo(token, chatRoom.chatRoomId);
        fetchMessages(token, chatRoom.chatRoomId);
        connect();
      } else {
        console.error("채팅방 참여에 실패하였습니다.");
      }
    } catch (error) {
      console.error("채팅방 참여 중 오류가 발생했습니다.:", error);
    }
  };

  return (
    <div className="chat-display">
      <div className="chat-display__msg">
        {messages.map((msg, index) => (
          <div
            key={index}
            onClick={() => {
              if (msg.userId === userId) {
                setSelectedMessage(msg.chatId);
                setShowDeleteModal(true);
              }
            }}
          >
            <div
              className={`chat-display__content ${
                msg.type === "JOIN" || msg.type === "LEAVE"
                  ? "system-message"
                  : msg.userId === userId
                  ? "my-message"
                  : "other-message"
              }`}
            >
              {console.log(
                `Message Type: ${msg.type}, Content: ${msg.content}`
              )}
              {msg.type === "JOIN" || msg.type === "LEAVE" ? (
                <div>{msg.content}</div>
              ) : (
                <>
                  <strong>{msg.sender}</strong>: {msg.content}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className="chat-display__holder">
          <div className="chat-display__wrapper">
            <input
              className="chat-display__input"
              type="text"
              placeholder="메시지 입력"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <button className="chat-display__button" onClick={sendMessage}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              className="icon-2xl"
            >
              <circle cx="16" cy="16" r="16" fill="black" />
              <path
                fill="white"
                fillRule="evenodd"
                d="M15.192 8.906a1.143 1.143 0 0 1 1.616 0l5.143 5.143a1.143 1.143 0 0 1-1.616 1.616l-3.192-3.192v9.813a1.143 1.143 0 0 1-2.286 0v-9.813l-3.192 3.192a1.143 1.143 0 1 1-1.616-1.616z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <button
          className="chat-display__leave-button"
          onClick={() => setShowLeaveModal(true)}
        >
          나가기
        </button>
      </div>

      {showLeaveModal && (
        <div className="modal">
          <div className="modal-content">
            <p>채팅을 나가시겠습니까?</p>
            <button onClick={handleLeave}>예</button>
            <button onClick={() => setShowLeaveModal(false)}>아니요</button>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <p>삭제하시겠습니까?</p>
            <button onClick={handleDeleteMessage}>예</button>
            <button onClick={() => setShowDeleteModal(false)}>아니요</button>
          </div>
        </div>
      )}

      {showJoinModal && (
        <div className="modal">
          <div className="modal-content">
            <p>채팅방에 참여하시겠습니까?</p>
            <button onClick={confirmJoinChatRoom}>예</button>
            <button onClick={() => setShowJoinModal(false)}>아니요</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatDisplay;
