package com.example.networking.messaging.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.networking.messaging.entity.ChatUser;

// 유저 추가하기 혹은 유저 가져오기와 같은 CRUD 역할 
public interface ChatUserRepository extends JpaRepository<ChatUser, Long> {
    List<ChatUser> findByChatRoomId(Long chat_room_id); // 채팅방 id로 채팅참가자 찾기
    List<ChatUser> findByUserId(Integer user_id); // 유저 id로 채팅참가자 찾기
}
