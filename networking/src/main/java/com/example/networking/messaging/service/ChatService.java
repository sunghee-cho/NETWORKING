package com.example.networking.messaging.service;

import com.example.networking.messaging.entity.Chat;
import com.example.networking.messaging.model.ChatMessage;
import com.example.networking.messaging.repository.ChatRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ChatService {

    private static final Logger logger = LoggerFactory.getLogger(ChatService.class);

    @Autowired
    private ChatRepository chatRepository;

    // 새로운 메세지 저장하기
    @Transactional
    public Chat saveMessage(ChatMessage chatMessage) {
        Chat chat = new Chat();
        chat.setChatRoomId(chatMessage.getChatRoomId());
        chat.setUserId(chatMessage.getUserId());
        chat.setMessage(chatMessage.getContent());
        chat.setReadStatus(false); 
        chat.setNickname(chatMessage.getSender());
        chat.setIsDeleted(false); 
        chat.setType(chatMessage.getType());

        logger.info("Saving message: " + chat);

        Chat savedChat = chatRepository.save(chat);
        logger.info("Message saved successfully: " + savedChat);

        return savedChat;
    }

    // 채팅방 id로 채팅메세지 찾기
    public List<Chat> getMessagesByChatRoomId(Long chatRoomId) {
        return chatRepository.findActiveChatsByChatRoomId(chatRoomId);
    }

    // 유저 id로 채팅메세지 찾기
    public List<Chat> getMessagesByUserId(Integer userId) {
        return chatRepository.findByUserId(userId);
    }

    // 메제시 읽음 확인하기 
    @Transactional
    public Optional<Chat> updateReadStatus(Long chatId, Boolean readStatus) {
        Optional<Chat> message = chatRepository.findById(chatId);
        if (message.isPresent()) {
            Chat chat = message.get();
            chat.setReadStatus(readStatus);
            chatRepository.save(chat);
        }
        return message;
    }

    // 메세지 삭제
    @Transactional
    public void softDeleteMessage(Long chatId) {
        Optional<Chat> message = chatRepository.findById(chatId);
        if (message.isPresent()) {
            Chat chat = message.get();
            chat.setIsDeleted(true);
            chatRepository.save(chat);
        }
    }
}
