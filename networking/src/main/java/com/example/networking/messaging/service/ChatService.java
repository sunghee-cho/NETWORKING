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
    public void saveMessage(ChatMessage chatMessage) {
        try {
            Chat chat = new Chat();
            chat.setChatRoomId(chatMessage.getChatRoomId());
            chat.setUserId(chatMessage.getUserId());
            chat.setMessage(chatMessage.getContent());
            chat.setReadStatus(false); // 읽지않음을 디폴트로 설정하기 
            chat.setNickname(chatMessage.getSender());
            chat.setIsDeleted(false); // 삭제되지 않음으로 설정
            chat.setType(chatMessage.getType());

            logger.info("메세지를 저장중입니다.: " + chat);

            chatRepository.save(chat);
            logger.info("메세지가 성공적으로 저장되었습니다.");
        } catch (Exception e) {
            logger.error("메세지를 저장하는데 실패하였습니다.: ", e);
        }
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
