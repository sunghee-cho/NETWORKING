package com.example.networking.messaging.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.networking.messaging.entity.ChatUser;
import com.example.networking.messaging.service.ChatUserService;

import java.util.List;

@RestController
@RequestMapping("/api/chat/users")
public class ChatUserController {

    @Autowired
    private ChatUserService chatUserService;

    
    @PostMapping
    public ResponseEntity<ChatUser> addUserToChatRoom(@RequestBody ChatUser chatUser) {
        ChatUser savedChatUser = chatUserService.addUserToChatRoom(chatUser);
        return ResponseEntity.ok(savedChatUser);
    }

    @GetMapping("/room/{chatRoomId}")
    public ResponseEntity<List<ChatUser>> getParticipantsByChatRoomId(@PathVariable Long chatRoomId) {
        List<ChatUser> participants = chatUserService.getParticipantsByChatRoomId(chatRoomId);
        return ResponseEntity.ok(participants);
    }

    @DeleteMapping("/room/{chatRoomId}/user/{userId}")
    public ResponseEntity<Void> removeUserFromChatRoom(@PathVariable Long chatRoomId, @PathVariable Integer userId) {
        chatUserService.removeUserFromChatRoom(chatRoomId, userId);
        return ResponseEntity.noContent().build();
    }
}
