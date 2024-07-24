package com.example.networking.messaging.service;

import com.example.networking.messaging.entity.ChatUser;
import com.example.networking.messaging.model.ChatMessage;
import com.example.networking.messaging.entity.ChatRoom;
import com.example.networking.messaging.repository.ChatUserRepository;
import com.example.networking.messaging.repository.ChatRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.networking.messaging.service.ChatService;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class ChatUserService {
    
    @Autowired
    private ChatUserRepository chatUserRepository;

    @Autowired
    private ChatRoomRepository chatRoomRepository;


    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private ChatService chatService;

    @SuppressWarnings("unused")
    private static final Logger logger = LoggerFactory.getLogger(ChatUserService.class);

    // 채팅방에 유저 추가하기
    public ChatUser addUserToChatRoom(ChatUser chatUser) {
        return chatUserRepository.save(chatUser);
    }

    // 채팅방 id로 채팅참가자 찾기
    public List<ChatUser> getParticipantsByChatRoomId(Long chatRoomId) {
        return chatUserRepository.findByChatRoomId(chatRoomId);
    }

    // 채팅방 & 유저 id로 유저 삭제하기 
    @Transactional
    public void removeUserFromChatRoom(Long chatRoomId, Integer userId) {
        String nickname = chatUserRepository.findNicknameByUserIdAndChatRoomId(userId, chatRoomId);
        chatUserRepository.deleteByChatRoomIdAndUserId(chatRoomId, userId);
    
        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setType(ChatMessage.MessageType.LEAVE);
        chatMessage.setSender(nickname);
        chatMessage.setContent(nickname + " 님이 나갔습니다.");
        chatMessage.setUserId(userId);
        chatMessage.setChatRoomId(chatRoomId);
    
        chatService.saveMessage(chatMessage);
    
        messagingTemplate.convertAndSend("/topic/groupChatRoom/" + chatRoomId, chatMessage);
    }
    

    // 채팅방에 참여된 유저인지 확인하기
    public boolean isUserParticipant(Long chatRoomId, Integer userId) {
        return chatUserRepository.existsByChatRoomIdAndUserId(chatRoomId, userId);
    }

    // 유저 id & 채팅방 id로 닉네임 찾기 
    public String getNicknameByUserIdAndChatRoomId(Integer userId, Long chatRoomId) {
        return chatUserRepository.findNicknameByUserIdAndChatRoomId(userId, chatRoomId);
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
