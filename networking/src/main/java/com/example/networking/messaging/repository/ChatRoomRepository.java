package com.example.networking.messaging.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.networking.messaging.entity.ChatRoom;

// 새로운 채팅룸 만들기 혹은 채팅룸 가져오기와 같은 CRUD 역할 
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long>{
    List<ChatRoom> findByChatType(String chatType); // 채팅방 타입으로 채팅방 찾기
}
