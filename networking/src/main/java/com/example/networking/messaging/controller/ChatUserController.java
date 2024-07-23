package com.example.networking.messaging.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.networking.messaging.entity.ChatUser;
import com.example.networking.messaging.service.ChatUserService;
import com.example.networking.security.jwt.provider.JwtTokenProvider;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat/users")
public class ChatUserController {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

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

    @GetMapping("/{chatRoomId}/isParticipant")
    public ResponseEntity<?> isUserParticipant(@PathVariable Long chatRoomId, @RequestHeader("Authorization") String token) {
        Integer userId = getUserIdFromToken(token); 
        boolean isJoined = chatUserService.isUserParticipant(chatRoomId, userId);
        Map<String, Boolean> response = new HashMap<>();
        response.put("isJoined", isJoined);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/join/{chatRoomId}")
    public ResponseEntity<?> joinChatRoom(@PathVariable Long chatRoomId, @RequestBody Map<String, String> payload, @RequestHeader("Authorization") String token) {
        String nickname = payload.get("nickname");
        String password = payload.get("password");
        Integer userId = getUserIdFromToken(token); 
        chatUserService.joinChatRoom(chatRoomId, nickname, password, userId);
        return ResponseEntity.ok().build();
    }

    // 유저id에서 토큰 가져오기
    private Integer getUserIdFromToken(String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Invalid token format.");
        }
    
        String jwtToken = token.substring(7);
        String secretKey = jwtTokenProvider.getSigningKeyAsString();
    
        @SuppressWarnings("deprecation")
        Claims claims = Jwts.parser()
                .setSigningKey(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .build()
                .parseClaimsJws(jwtToken)
                .getBody();
    
        String userIdString = claims.get("uno", String.class); // Corrected the method call
        if (userIdString == null) {
            throw new NumberFormatException("Token does not contain 'uno' claim.");
        }
        
        return Integer.parseInt(userIdString);
    }
    
    
}
