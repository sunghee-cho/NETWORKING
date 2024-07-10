package com.example.messaging.controller;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.web.bind.annotation.RestController;

import com.example.messaging.model.ChatMessage;

@RestController
public class ChatController {

  // 그룹메세지
  @MessageMapping("/chat.sendMessage")
  @SendTo("/topic/groupChatRoom/{roomId}") // /topic/groupChatRoom/{roodId}에 소속된 모든 회원들에게 메세지가 전송됨
  public ChatMessage sendGroupMessage(ChatMessage chatMessage) {
    return chatMessage;
  }

  // 1대1메세지 
  @MessageMapping("/chat.sendPrivateMessage")
  @SendToUser("/queue/user")  // /queue/user에 소속된 specific 회원에게만 메세지가 전송됨
  public ChatMessage sendPrivateMessage(ChatMessage chatMessage) {
    return chatMessage;
  }

  // 1대1채팅에 유저 추가
  @SuppressWarnings("null")
  @MessageMapping("/chat.addUser") 
  @SendTo("/queue/user")
  public ChatMessage addUser(ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {
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


