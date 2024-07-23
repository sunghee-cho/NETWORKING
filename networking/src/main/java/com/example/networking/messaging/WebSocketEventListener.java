package com.example.networking.messaging;

import com.example.networking.messaging.model.ChatMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

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

    @SuppressWarnings("null")
    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String nickname = (String) headerAccessor.getSessionAttributes().get("nickname");
        String userId = (String) headerAccessor.getSessionAttributes().get("userId");
        String chatRoomId = (String) headerAccessor.getSessionAttributes().get("chatRoomId");
        if (nickname != null && userId != null && chatRoomId != null) {
            logger.info("유저 퇴장 : " + nickname);
            ChatMessage chatMessage = new ChatMessage();
            chatMessage.setType(ChatMessage.MessageType.LEAVE);
            chatMessage.setSender(nickname);
            chatMessage.setContent(nickname + "님이 나갔습니다.");
            chatMessage.setUserId(Integer.parseInt(userId)); 
            chatMessage.setChatRoomId(Long.parseLong(chatRoomId)); 
            messagingTemplate.convertAndSend("/topic/groupChatRoom/" + chatRoomId, chatMessage);
        }
    }
}
