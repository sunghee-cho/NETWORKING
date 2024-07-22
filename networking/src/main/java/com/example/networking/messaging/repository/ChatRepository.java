package com.example.networking.messaging.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.networking.messaging.entity.Chat;


// 메세지 저장 혹은 메세지 가져오기와 같은 CRUD 역할 
public interface ChatRepository extends JpaRepository<Chat, Long>{
    List<Chat> findByChatRoomId(Long chatRoomId); // 채팅방 id로 채팅메세지 찾기
    List<Chat> findByUserId(Integer userId); // 유저 id로 채팅메세지 찾기
}
