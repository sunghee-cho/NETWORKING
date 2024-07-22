package com.example.networking.messaging.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.networking.messaging.entity.ChatUser;

// 유저 추가하기 혹은 유저 가져오기와 같은 CRUD 역할 
public interface ChatUserRepository extends JpaRepository<ChatUser, Long> {
    List<ChatUser> findByChatRoomId(Long chatRoomId); // 채팅방 id로 채팅참가자 찾기
    void deleteByChatRoomIdAndUserId(Long chatRoomId,  Integer userId); // 채팅방과 유저 id로 유저 삭제하기
}
