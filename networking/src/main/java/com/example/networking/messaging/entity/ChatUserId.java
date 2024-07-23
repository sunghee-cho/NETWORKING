package com.example.networking.messaging.entity;

import java.io.Serializable;
import java.util.Objects;

public class ChatUserId implements Serializable {
    private Long chatRoomId;
    private Integer userId;

    public ChatUserId() {}

    public ChatUserId(Long chatRoomId, Integer userId) {
        this.chatRoomId = chatRoomId;
        this.userId = userId;
    }

    // Getters and Setters
    public Long getChatRoomId() {
        return chatRoomId;
    }

    public void setChatRoomId(Long chatRoomId) {
        this.chatRoomId = chatRoomId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ChatUserId that = (ChatUserId) o;
        return Objects.equals(chatRoomId, that.chatRoomId) && Objects.equals(userId, that.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(chatRoomId, userId);
    }
}
