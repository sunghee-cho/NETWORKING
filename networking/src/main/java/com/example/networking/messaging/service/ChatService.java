package com.example.networking.messaging.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import com.example.networking.messaging.entity.Chat;
import com.example.networking.messaging.repository.ChatRepository;

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;
    
        // 새로운 메세지 저장하기
        public Chat saveMessage(Chat chat) {
        return chatRepository.save(chat); 
        }

        // 채팅방 id로 채팅메세지 찾기
        public List<Chat> getMessagesByChatRoomId(Long chatRoomId) {
        return chatRepository.findByChatRoomId(chatRoomId); 
        }

        // 유저 id로 채팅메세지 찾기
        public List<Chat> getMessagesByUserId(Integer userId) {
        return chatRepository.findByUserId(userId); 
        }

       // 메제시 읽음 확인하기 
         public Optional<Chat> updatedReadStatus(Long chatId, Boolean readStatus) {
            Optional<Chat> chatOptional = chatRepository.findById(chatId);
            if(chatOptional.isPresent()){
                Chat chat = chatOptional.get();
                chat.setReadStatus(readStatus);
                return Optional.of(chatRepository.save(chat));
            }
            return Optional.empty();

       }
    
}
