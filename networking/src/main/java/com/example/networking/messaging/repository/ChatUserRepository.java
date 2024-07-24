package com.example.networking.messaging.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.networking.messaging.entity.ChatUser;
import com.example.networking.messaging.entity.ChatUserId;
import java.util.Optional;
import org.springframework.stereotype.Repository;

// 유저 추가하기 혹은 유저 가져오기와 같은 CRUD 역할 
@Repository
public interface ChatUserRepository extends JpaRepository<ChatUser, ChatUserId> {
    List<ChatUser> findByChatRoomId(Long chatRoomId);    // 채팅방 id로 채팅참가자 찾기
    void deleteByChatRoomIdAndUserId(Long chatRoomId, Integer userId); // 채팅방과 유저 id로 유저 삭제하기
    boolean existsByChatRoomIdAndUserId(Long chatRoomId, Integer userId); // 채팅방 id와 유저 id로 유저 존재 여부 확인
    List<ChatUser> findByChatRoomIdAndIsActiveTrue(Long chatRoomId); // 채팅방 id와 active 상태로 찾기 
    Optional<ChatUser> findByChatRoomIdAndUserIdAndIsActiveTrue(Long chatRoomId, Integer userId); // 채팅방 & 유저 id로 active 상태 확인하기 
    ChatUser findByChatRoomIdAndUserId(Long chatRoomId, Integer userId); // 채팅 id와 유저 id로 찾기 

    // 채팅방 id와 유저 id & isactive 로 닉네임 찾기 
    @Query("SELECT c.nickname FROM ChatUser c WHERE c.userId = :userId AND c.chatRoomId = :chatRoomId AND c.isActive = true")
    String findNicknameByUserIdAndChatRoomId(@Param("userId") Integer userId, @Param("chatRoomId") Long chatRoomId);
}
