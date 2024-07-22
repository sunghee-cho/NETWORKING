import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import Cookies from "js-cookie";

const ChatDisplay = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(null);
  const stompClient = useRef(null);

  const connect = () => {
    const token = Cookies.get("accessToken"); // cookie에서 토큰 가져오기
    if (!token) {
      console.error("저장된 토큰이 없습니다.");
      return;
    }
    const socket = new SockJS(`http://localhost:8080/chat?token=${token}`);
    stompClient.current = Stomp.over(socket);
    stompClient.current.connect(
      {},
      (frame) => {
        console.log("연결성공: " + frame);

        fetchUserInfo(token); // userId 포함시키기

        stompClient.current.subscribe("/user/queue/user", (message) => {
          const newMessage = JSON.parse(message.body);
          console.log("메세지가 전달되었습니다:", newMessage);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        stompClient.current.send(
          "/app/chat.addUser",
          {},
          JSON.stringify({ sender: username })
        );
      },
      (error) => {
        console.error("웹소켓 연결에 실패하였습니다:", error);
      }
    );
  };

  const fetchUserInfo = async (token) => {
    try {
      const response = await fetch("http://localhost:8080/users/info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUserId(data.no); // user 테이블의 NO를 userId로 세팅하기 
      console.log(data);
    } catch (error) {
      console.error("유저 정보를 불러오지 못했습니다.:", error);
    }
  };

  useEffect(() => {
    return () => {
      if (stompClient.current) {
        stompClient.current.disconnect(() => {
          console.log("연결이 종료되었습니다.");
        });
      }
    };
  }, []);

  const sendMessage = () => {
    if (stompClient.current && message.trim() !== "") {
      const chatMessage = {
        sender: username,
        content: message,
        type: "PRIVATE_CHAT",
        userId: userId,
      };
      stompClient.current.send(
        "/app/chat.sendPrivateMessage",
        {},
        JSON.stringify(chatMessage)
      );
      console.log("메세지를 보내고 있습니다:", chatMessage);
      setMessage("");
    } else {
      console.error("STOMP client 연결에 실패하였습니다.");
    }
  };

  return (
    <div>
      <h1>채팅 테스트</h1>
      <div>
        <input
          type="text"
          placeholder="이름 입력"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={connect}>참여하기</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="메시지 입력"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>메세지 보내기</button>
      </div>
      <div>
        <h2>채팅:</h2>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatDisplay;
