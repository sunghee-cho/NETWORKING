package com.example.networking.messaging.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ChatParticipants") 
public class ChatUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)


    @Column(name = "chat_room_id")
    private Long chatRoomId;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "created_at", updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @Column(name = "updated_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt;

    
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

    public LocalDateTime getCreatedAt() {
    return createdAt;
    }   

    public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
    }   

    public LocalDateTime getUpdatedAt() {
    return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
    this.updatedAt = updatedAt;
    }


}
