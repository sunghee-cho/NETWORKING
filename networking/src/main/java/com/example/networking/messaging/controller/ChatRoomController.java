package com.example.networking.messaging.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.networking.messaging.entity.ChatRoom;
import com.example.networking.messaging.service.ChatRoomService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/chat/rooms")
public class ChatRoomController {

    @Autowired
    private ChatRoomService chatRoomService;

    // 채팅방 만들기 
    @PostMapping
    public ResponseEntity<ChatRoom> createChatRoom(@RequestBody ChatRoom chatRoom) {
        ChatRoom savedChatRoom = chatRoomService.createChatRoom(chatRoom);
        return ResponseEntity.ok(savedChatRoom);
    }

    // 채팅방 id로 채팅방 찾기 
    @GetMapping("/{chatRoomId}")
    public ResponseEntity<ChatRoom> getChatRoomById(@PathVariable Long chatRoomId) {
        Optional<ChatRoom> chatRoom = chatRoomService.getChatRoomById(chatRoomId);
        return chatRoom.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 채팅방 정보 업데이트하기 
    @PutMapping
    public ResponseEntity<ChatRoom> updateChatRoom(@RequestBody ChatRoom chatRoom) {
        ChatRoom updatedChatRoom = chatRoomService.updateChatRoom(chatRoom);
        return ResponseEntity.ok(updatedChatRoom);
    }

    // 채팅방 id로 비밀 채팅방 찾기 
    @GetMapping("/secret/{chatRoomId}")
    public ResponseEntity<ChatRoom> getSecretChatRoomById(@PathVariable Long chatRoomId, @RequestParam String password) {
        Optional<ChatRoom> chatRoom = chatRoomService.getSecretChatRoomById(chatRoomId, password);
        return chatRoom.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.status(403).build());
    }

    // 모든 그룹채팅방 찾기 
    @GetMapping("/group")
    public ResponseEntity<List<ChatRoom>> getAllGroupChatRooms() {
        List<ChatRoom> chatRooms = chatRoomService.getAllGroupChatRooms();
        return ResponseEntity.ok(chatRooms);
    }

    // 유저가 참여한 모든 채팅방 찾기
    @GetMapping("/my")
    public ResponseEntity<List<ChatRoom>> getChatRoomsByUserId(@RequestParam Integer userId) {
        List<ChatRoom> chatRooms = chatRoomService.getChatRoomsByUserId(userId);
        return ResponseEntity.ok(chatRooms);
    }
}
