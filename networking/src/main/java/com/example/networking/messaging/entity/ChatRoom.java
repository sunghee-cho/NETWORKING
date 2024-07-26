package com.example.networking.messaging.entity;

import com.example.networking.messaging.model.ChatMessage.MessageType;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "chat_rooms") 
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_room_id")
    private Long chatRoomId;

    @Column(name = "room_name", nullable = false, length = 255)
    private String roomName;

    @Column(name = "hashtag", length = 255)
    private String hashtag;

    @Enumerated(EnumType.STRING)
    @Column(name = "chat_type", nullable = false, length = 255)
    private MessageType chatType;

    @Column(name = "password", length = 255)
    private String password;

    @Column(name = "is_secret")
    private boolean isSecret;

    @Column(name = "created_at", updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @Column(name = "updated_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "chatRoom")
    @JsonManagedReference
    private List<ChatUser> participants;

    @OneToMany(mappedBy = "chatRoom")
    @JsonManagedReference
    private List<Chat> chats;

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

    public String getHashtag() {
        return hashtag;
    }

    public void setHashtag(String hashtag) {
        this.hashtag = hashtag;
    }

    public MessageType getChatType() {
        return chatType;
    }

    public void setChatType(MessageType chatType) {
        this.chatType = chatType;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isSecret() {
        return isSecret;
    }

    public void setSecret(boolean isSecret) {
        this.isSecret = isSecret;
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

    public List<ChatUser> getParticipants() {
        return participants;
    }

    public void setParticipants(List<ChatUser> participants) {
        this.participants = participants;
    }

    public List<Chat> getChats() {
        return chats;
    }

    public void setChats(List<Chat> chats) {
        this.chats = chats;
    }
}
