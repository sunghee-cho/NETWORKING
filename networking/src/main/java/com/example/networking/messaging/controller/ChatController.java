package com.example.networking.messaging.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import com.example.networking.messaging.model.ChatMessage;
import com.example.networking.messaging.service.ChatService;

@Controller
public class ChatController {

    private static final Logger logger = LoggerFactory.getLogger(ChatController.class);

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    // 그룹메세지
    @MessageMapping("/chat.sendMessage/{chatRoomId}")
    @SendTo("/topic/groupChatRoom/{chatRoomId}") 
    public ChatMessage sendGroupMessage(ChatMessage chatMessage) {
        chatService.saveMessage(chatMessage); 
        return chatMessage;
    }

    // 1대1메세지 
    @MessageMapping("/chat.sendPrivateMessage")
    @SendToUser("/queue/user")
    public ChatMessage sendPrivateMessage(ChatMessage chatMessage) {
        logger.info("메세지 전달 완료: " + chatMessage.getContent());
        chatService.saveMessage(chatMessage); 
        return chatMessage;
    }

    // 1대1채팅에 유저 추가
    @SuppressWarnings("null")
    @MessageMapping("/chat.addUser")
    @SendToUser("/queue/user")
    public ChatMessage addUser(ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {
        logger.info("유저 추가 완료: " + chatMessage.getSender());
        headerAccessor.getSessionAttributes().put("nickname", chatMessage.getSender());
        headerAccessor.getSessionAttributes().put("userId", chatMessage.getUserId().toString());
        chatMessage.setContent(chatMessage.getSender() + "님이 들어왔습니다.");
        chatMessage.setType(ChatMessage.MessageType.JOIN);
        return chatMessage;
    }

    // 그룹채팅에 유저 추가 
    @SuppressWarnings("null")
    @MessageMapping("/chat.addUser/{chatRoomId}")
    @SendTo("/topic/groupChatRoom/{chatRoomId}")
    public ChatMessage addUserToRoom(ChatMessage chatMessage, @DestinationVariable String chatRoomId, SimpMessageHeaderAccessor headerAccessor) {
        headerAccessor.getSessionAttributes().put("nickname", chatMessage.getSender());
        headerAccessor.getSessionAttributes().put("userId", chatMessage.getUserId().toString());
        headerAccessor.getSessionAttributes().put("chatRoomId", chatRoomId);
        chatMessage.setContent(chatMessage.getSender() + "님이 들어왔습니다.");
        chatMessage.setType(ChatMessage.MessageType.JOIN);
        return chatMessage;
    }

}
