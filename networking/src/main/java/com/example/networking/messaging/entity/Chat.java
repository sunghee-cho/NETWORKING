// package com.example.networking.messaging.entity;

// import jakarta.persistence.*;
// import java.time.LocalDateTime;


// @Entity
// @Table(name="Chats") 
// public class Chat {
    
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)

//     @Column(name = "chat_id")
//     private Long chatId;

//     @Column(name = "chat_room_id")
//     private Long chatRoomId;

//     @Column(name = "user_id", nullable = false, length = 45)
//     private String userId;

//     @Column(name = "message", nullable = false)
//     private String message;

//     @Column(name = "read_status")
//     private Boolean readStatus;

//     @Column(name = "created_at", updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
//     private LocalDateTime createdAt;

//     @Column(name = "updated_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
//     private LocalDateTime updatedAt;


//     // Getters and Setters
//     public Long getChatId() {
//         return chatId;
//     }

//     public void setChatId(Long chatId) {
//         this.chatId = chatId;
//     }

//     public Long getChatRoomId() {
//         return chatRoomId;
//     }

//     public void setChatRoomId(Long chatRoomId) {
//         this.chatRoomId = chatRoomId;
//     }

//     public String getUserId() {
//         return userId;
//     }

//     public void setUserId(String userId) {
//         this.userId = userId;
//     }

//     public String getMessage() {
//         return message;
//     }

//     public void setMessage(String message) {
//         this.message = message;
//     }

//     public Boolean getReadStatus() {
//         return readStatus;
//     }

//     public void setReadStatus(Boolean readStatus) {
//         this.readStatus = readStatus;
//     }

//     public LocalDateTime getCreatedAt() {
//         return createdAt;
//     }

//     public void setCreatedAt(LocalDateTime createdAt) {
//         this.createdAt = createdAt;
//     }

//     public LocalDateTime getUpdatedAt() {
//         return updatedAt;
//     }

//     public void setUpdatedAt(LocalDateTime updatedAt) {
//         this.updatedAt = updatedAt;
//     }

// }
