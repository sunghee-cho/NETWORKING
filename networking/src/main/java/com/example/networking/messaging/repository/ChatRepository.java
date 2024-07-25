package com.example.networking.messaging.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.example.networking.messaging.entity.Chat;
import org.springframework.stereotype.Repository;

// 메세지 저장 혹은 메세지 가져오기와 같은 CRUD 역할 
@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {
    @Query("SELECT c FROM Chat c WHERE c.chatRoomId = :chatRoomId AND c.isDeleted = false")
    List<Chat> findActiveChatsByChatRoomId(@Param("chatRoomId") Long chatRoomId); // 채팅방 id로 active 유저 찾기

    List<Chat> findByChatRoomId(Long chatRoomId); // 채팅방 id로 채팅메세지 찾기
    List<Chat> findByUserId(Integer userId); // 유저 id로 채팅메세지 찾기
  
}
