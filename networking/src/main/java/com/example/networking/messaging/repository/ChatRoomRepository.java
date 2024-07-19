package com.example.networking.messaging.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.networking.messaging.entity.ChatRoom;

// 새로운 채팅룸 만들기 혹은 채팅룸 가져오기와 같은 CRUD 역할 
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long>{
    Optional<ChatRoom> findByChatRoomId(Long chat_room_id); // 채팅방 id로 채팅방 찾기
    List<ChatRoom> findByRoomName(String room_name); // 채팅방 이름으로 채팅방 찾기
    List<ChatRoom> findByChatType(String chat_type); // 채팅방 타입으로 채팅방 찾기
}
