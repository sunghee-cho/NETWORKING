package com.example.networking.messaging.service;

import com.example.networking.messaging.entity.ChatUser;
import com.example.networking.messaging.entity.ChatRoom;
import com.example.networking.messaging.repository.ChatUserRepository;
import com.example.networking.messaging.repository.ChatRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatUserService {
    
    @Autowired
    private ChatUserRepository chatUserRepository;

    @Autowired
    private ChatRoomRepository chatRoomRepository;

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

    // 채팅방에 참여된 유저인지 확인하기
    public boolean isUserParticipant(Long chatRoomId, Integer userId) {
        return chatUserRepository.existsByChatRoomIdAndUserId(chatRoomId, userId);
    }

    // 유저 id로 닉네임 찾기 
    public String getNicknameByUserId(Integer userId) {
        return chatUserRepository.findNicknameByUserId(userId);
    }

    // 채팅방에 참여유저 추가하기
    public void joinChatRoom(Long chatRoomId, String nickname, String password, Integer userId) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
                .orElseThrow(() -> new RuntimeException("채팅방을 찾을 수 없습니다."));

        // 비밀채팅방일 경우에 비밀번호 확인하기 
        if (chatRoom.isSecret() && !chatRoom.getPassword().equals(password)) {
            throw new RuntimeException("비밀번호가 맞지 않습니다.");
        }

        ChatUser participant = new ChatUser();
        participant.setChatRoomId(chatRoomId);
        participant.setNickname(nickname);
        participant.setUserId(userId);
        chatUserRepository.save(participant);
    }
}
