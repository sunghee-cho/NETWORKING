package com.example.networking.messaging.model;

import java.sql.Timestamp;

// 웹소켓에 사용 
public class ChatMessage {
    private MessageType type;
    private String content;
    private String sender;
    private String receiver;
    private Integer userId; 
    private Long chatRoomId; 
    private Timestamp timestamp;

    public enum MessageType {
        GROUP_CHAT,
        PRIVATE_CHAT,
        JOIN,
        LEAVE
    }

    // Getters and setters
    public MessageType getType() {
        return type;
    }

    public void setType(MessageType type) {
        this.type = type;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Long getChatRoomId() {
        return chatRoomId;
    }

    public void setChatRoomId(Long chatRoomId) {
        this.chatRoomId = chatRoomId;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }
}
