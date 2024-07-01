package com.example.messaging.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import com.example.messaging.model.ChatMessage;

@Controller
public class ChatController {

  @MessageMapping("/chat.sendMessage")
  @SendTo("/topic/public")
  public ChatMessage sendMessage(ChatMessage chatMessage) {
    return chatMessage;
  }

  @SuppressWarnings("null")
@MessageMapping("/chat.addUser")
  @SendTo("/topic/public")
  public ChatMessage addUser(ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {
    headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
    chatMessage.setContent(chatMessage.getSender() + " 들어왔습니다!");
    return chatMessage;
  }
}

