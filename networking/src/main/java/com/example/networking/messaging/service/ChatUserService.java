package com.example.networking.messaging.service;

import com.example.networking.messaging.entity.ChatUser;
import com.example.networking.messaging.repository.ChatUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatUserService {
    @Autowired
    private ChatUserRepository chatUserRepository;

    // 채팅방에 유저 추가하기
    public ChatUser addUserToChatRoom(ChatUser chatUser) {
        return chatUserRepository.save(chatUser);
    }

    // 채팅방 id로 채팅참가자 찾기
    public List<ChatUser> getParticipantsByChatRoomId(Long chatRoomId) {
        return chatUserRepository.findByChatRoomId(chatRoomId);
    }

    // 채팅방 & 유저 id로 유저 삭제하기 
    public void removeUserFromChatRoom(Long chatRoomId, Integer userId) {
        chatUserRepository.deleteByChatRoomIdAndUserId(chatRoomId, userId);
    }
}
