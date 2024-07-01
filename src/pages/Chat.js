import ChatList from "../components/Chat/ChatList";
// import React, { useState, useEffect } from "react";
// import SockJS from "sockjs-client";
// import { Client } from "@stomp/stompjs";
// import axios from "axios";
import "../styles/Chat/Chat.css";

const Chat = () => {
  // const [messages, setMessages] = useState([]);
  // const [message, setMessage] = useState("");
  // const [stompClient, setStompClient] = useState(null);

  // useEffect(() => {
  //   axios.get("/csrf").then((response) => {
  //     const csrfToken = response.data.token;

  //     const authToken = "";

  //     const socket = new SockJS("/chat");
  //     const client = new Client({
  //       webSocketFactory: () => socket,
  //       connectHeaders: {
  //         "X-CSRF-TOKEN": csrfToken,
  //         Authorization: `Bearer ${authToken}`,
  //       },
  //       onConnect: () => {
  //         console.log("Connected");

  //         client.subscribe("/topic/public", (msg) => {
  //           const newMessage = JSON.parse(msg.body);
  //           setMessages((prevMessages) => [...prevMessages, newMessage]);
  //         });
  //       },
  //     });

  //     client.activate();
  //     setStompClient(client);

  //     return () => {
  //       if (stompClient) {
  //         stompClient.deactivate();
  //       }
  //     };
  //   });
  // }, []);

  // const sendMessage = () => {
  //   if (stompClient && message.trim()) {
  //     const chatMessage = {
  //       sender: "User",
  //       content: message,
  //       type: "CHAT",
  //     };
  //     stompClient.publish({
  //       destination: "/app/chat.sendMessage",
  //       body: JSON.stringify(chatMessage),
  //     });
  //     setMessage("");
  //   }
  // };

  return (
    <div>
      <div>
        <ChatList />
      </div>
      {/* <div className="chat-container">
        <div className="message-input">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
        <div className="message-list">
          {messages.map((msg, index) => (
            <div key={index} className="message">
              <strong>{msg.sender}</strong>: {msg.content}
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Chat;
