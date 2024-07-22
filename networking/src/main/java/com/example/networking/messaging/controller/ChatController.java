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
    @MessageMapping("/chat.sendMessage/{roomId}")
    @SendTo("/topic/groupChatRoom/{roomId}") // /topic/groupChatRoom/{roodId}에 소속된 모든 회원들에게 메세지가 전송됨
    public ChatMessage sendGroupMessage(ChatMessage chatMessage) {
        chatService.saveMessage(chatMessage); // db에 메세지 저장하기
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
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        chatMessage.setContent(chatMessage.getSender() + "님이 들어왔습니다.");
        return chatMessage;
    }

    // 그룹채팅에 유저 추가 
    @SuppressWarnings("null")
    @MessageMapping("/chat.addUser/{roomId}")
    @SendTo("/topic/groupChatRoom/{roomId}")
    public ChatMessage addUserToRoom(ChatMessage chatMessage, @DestinationVariable String roomId, SimpMessageHeaderAccessor headerAccessor) {
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        headerAccessor.getSessionAttributes().put("roomId", roomId);
        chatMessage.setContent(chatMessage.getSender() + "님이 들어왔습니다.");
        return chatMessage;
    }


  // 유저 강퇴 
//   @SuppressWarnings("null")
//   @MessageMapping("/chat.removeUser/{roomId}")
//   @SendTo("/topic/groupChatRoom/{roomId}")
//   public ChatMessage removeUser(@DestinationVariable String roomId, ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {
//     headerAccessor.getSessionAttributes().remove("username", chatMessage.getSender());
//     chatMessage.setContent(chatMessage.getSender() + "님이 강퇴되었습니다.");
//     return chatMessage;
// }

}





