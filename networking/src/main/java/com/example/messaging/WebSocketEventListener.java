package com.example.messaging;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import com.example.messaging.model.ChatMessage;

@Component
public class WebSocketEventListener {

  private static final Logger logger = LoggerFactory.getLogger(WebSocketEventListener.class);
  private final SimpMessagingTemplate messagingTemplate;

  public WebSocketEventListener(SimpMessagingTemplate messagingTemplate) {
    this.messagingTemplate = messagingTemplate;
  }

  @EventListener
  public void handleWebSocketConnectListener(SessionConnectedEvent event) {
    logger.info("새로운 웹소켓 연결이 확인되었습니다.");
  }

  @EventListener
  public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
    StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
    @SuppressWarnings("null")
    String username = (String) headerAccessor.getSessionAttributes().get("username");
    @SuppressWarnings("null")
    String roomId = (String) headerAccessor.getSessionAttributes().get("roomId");
    if (username != null && roomId != null ) {
      logger.info("User Disconnected : {}" + username);
      ChatMessage chatMessage = new ChatMessage();
      chatMessage.setType(ChatMessage.MessageType.LEAVE);
      chatMessage.setSender(username);
      chatMessage.setContent(username + "님이 나갔습니다.");
      messagingTemplate.convertAndSend("/topic/groupChatRoom/" + roomId, chatMessage);
    }
  }
}
