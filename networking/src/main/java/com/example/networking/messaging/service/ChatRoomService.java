package com.example.networking.messaging.service;

import com.example.networking.messaging.entity.ChatRoom;
import com.example.networking.messaging.repository.ChatRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChatRoomService {
    @Autowired
    private ChatRoomRepository chatRoomRepository;

    // 채팅방 만들기
    public ChatRoom createChatRoom(ChatRoom chatRoom) {
        return chatRoomRepository.save(chatRoom);
    }

    // 채팅방 id로 채팅방 찾기
    public Optional<ChatRoom> getChatRoomById(Long chatRoomId) {
        return chatRoomRepository.findById(chatRoomId);
    }

    // 채팅방 정보 업데이트하기 
    public ChatRoom updateChatRoom(ChatRoom chatRoom) {
        return chatRoomRepository.save(chatRoom);
    }

    // 모든 그룹채팅창 찾기 
    public List<ChatRoom> getAllGroupChatRooms() {
        return chatRoomRepository.findByChatType("GROUP_CHAT");
    }

    // 채팅방 id로 비밀채팅방 찾기 
    public Optional<ChatRoom> getSecretChatRoomById(Long chatRoomId, String password) {
        Optional<ChatRoom> chatRoom = chatRoomRepository.findById(chatRoomId);
        if (chatRoom.isPresent() && chatRoom.get().getPassword().equals(password)) {
            return chatRoom;
        } else {
            return Optional.empty();
        }
    }

    // 모든 채팅방 찾기 
    public List<ChatRoom> getAllChatRooms() {
        return chatRoomRepository.findAll();
    }
}
