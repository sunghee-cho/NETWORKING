package com.example.networking.messaging.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="ChatRooms")
public class ChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)


    @Column(name = "chat_room_id")
    private Long chatRoomId;

    @Column(name = "room_name", nullable = false, length = 255)
    private String roomName;

    @Column(name = "chat_type", nullable = false, length = 255)
    private String chatType;

    @Column(name = "password", length = 255)
    private String password;

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
    
    public String getRoomName() {
    return roomName;
    }
    
    public void setRoomName(String roomName) {
    this.roomName = roomName;
    }   

    public String getChatType() {
    return chatType;
    }
        
    public void setChatType(String chatType) {
    this.chatType = chatType;
    }   

    public String getPassword() {
    return password;
    }
            
    public void setPassword(String password) {
    this.password = password;
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
