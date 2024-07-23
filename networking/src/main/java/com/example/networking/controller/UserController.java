package com.example.networking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.example.networking.dto.CustomUser;
import com.example.networking.dto.Users;
import com.example.networking.service.UserService;
import com.example.networking.messaging.service.ChatUserService;

import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.Map;

/**
 *    👨‍💻 회원 정보
 *    [GET]         /users/info     - 회원정보 조회     (ROLE_USER)
 *    [POST]        /users          - 회원가입          ALL
 *    [PUT]         /users          - 회원정보 수정     (ROLE_USER)
 *    [DELETE]      /users          - 회원탈퇴          (ROLE_ADMIN)
 */
@Slf4j
@RestController
@RequestMapping("/users")
public class UserController {
    
    @Autowired
    private UserService userService;

    @Autowired
    private ChatUserService chatUserService;

    /**
     * 사용자 정보 조회
     * @param customUser
     * @return
     */
    @Secured("ROLE_USER")           // USER 권한 설정
    @GetMapping("/info")
    public ResponseEntity<?> userInfo(@AuthenticationPrincipal CustomUser customUser) {
        
        log.info("::::: customUser :::::");
        log.info("customUser : "+ customUser);

        Users user = customUser.getUser();
        log.info("user : " + user);

        // 인증된 사용자 정보 
        if( user != null )
            return new ResponseEntity<>(user, HttpStatus.OK);

        // 인증 되지 않음
        return new ResponseEntity<>("UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
    }

    /**
     * 사용자 정보 및 닉네임 조회   -- 채팅시스템을 위해 새로 업데이트 --
     * @param customUser
     * @return
     */
    @SuppressWarnings("unused")
    @Secured("ROLE_USER")         
    @GetMapping("/infoWithNickname")
    public ResponseEntity<?> userInfoWithNickname(@AuthenticationPrincipal CustomUser customUser) {
        
        log.info("::::: customUser :::::");
        log.info("customUser : "+ customUser);

        Users user = customUser.getUser();
        log.info("user : " + user);

        String nickname = chatUserService.getNicknameByUserId(user.getNo());

        // 인증된 사용자 정보 
        if( user != null ) {
            Map<String, Object> response = new HashMap<>();
            response.put("no", user.getNo());
            response.put("userId", user.getUserId());
            response.put("nickname", nickname);
            response.put("name", user.getName());
            response.put("email", user.getEmail());
            // add other fields if needed
            
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        // 인증 되지 않음
        return new ResponseEntity<>("UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
    }


    /**
     * 회원가입
     * @param entity
     * @return
     * @throws Exception
     */
    @PostMapping("")
    public ResponseEntity<?> join(@RequestBody Users user) throws Exception {
        log.info("[POST] - /users");
        int result = userService.insert(user);

        if( result > 0 ) {
            log.info("회원가입 성공! - SUCCESS");
            return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        }
        else {
            log.info("회원가입 실패! - FAIL");
            return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        } 
    }

    /**
     * 회원 정보 수정
     * @param user
     * @return
     * @throws Exception
     */
    @Secured("ROLE_USER")           // USER 권한 설정
    @PutMapping("")
    public ResponseEntity<?> update(@RequestBody Users user) throws Exception {
        log.info("[PUT] - /users");
        int result = userService.update(user);

        if( result > 0 ) {
            log.info("회원수정 성공! - SUCCESS");
            return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        }
        else {
            log.info("회원수정 실패! - FAIL");
            return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        } 
    }

    /**
     * 회원 탈퇴
     * @param userId
     * @return
     * @throws Exception
     */
    @Secured("ROLE_USER")          //  USER 권한 설정
    @DeleteMapping("/{userId}")
    public ResponseEntity<?> destroy(@PathVariable("userId") String userId) throws Exception {
        log.info("[DELETE] - /users/{userId}");

        int result = userService.delete(userId);

        if( result > 0 ) {
            log.info("회원삭제 성공! - SUCCESS");
            return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        }
        else {
            log.info("회원삭제 실패! - FAIL");
            return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        }
        
    }
}
