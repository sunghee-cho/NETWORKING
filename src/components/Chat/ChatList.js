export default function ChatList() {
    return (
      <div>
        <button>전체 채팅방</button>
        <button>나의 채팅방</button>
        {/* 채팅 데이터를 list에서 map으로 돌리기  */}
        <ul>
          <li>채팅방1</li>
          <li>채팅방2</li>
          <li>채팅방3</li>
          <li>채팅방4</li>
          <li>채팅방5</li>
        </ul>
        <button>New Chat</button>
      </div>
    );
  }
