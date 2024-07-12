import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const Chat = () => {
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    if (stompClient) {
      stompClient.connect({}, (frame) => {
        console.log('Connected: ' + frame);

        stompClient.subscribe(`/topic/groupChatRoom/${roomId}`, (message) => {
          const newMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, newMessage.content]);
        });

        stompClient.send(`/app/chat.addUser/${roomId}`, {}, JSON.stringify({ sender: username }));
      });
    }
  }, [stompClient, roomId, username]);

  const connect = () => {
    const socket = new SockJS(process.env.REACT_APP_WEBSOCKET_URL);
    const client = Stomp.over(socket);
    setStompClient(client);
  };

  const sendMessage = () => {
    if (stompClient && message.trim() !== '') {
      const chatMessage = {
        sender: username,
        content: message,
        type: 'CHAT'
      };
      stompClient.send(`/app/chat.sendMessage/${roomId}`, {}, JSON.stringify(chatMessage));
      setMessage('');
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
        <input
          type="text"
          placeholder="방ID 입력"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button onClick={connect}>Join Chat</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="메시지 입력"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        <h2>Messages:</h2>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
