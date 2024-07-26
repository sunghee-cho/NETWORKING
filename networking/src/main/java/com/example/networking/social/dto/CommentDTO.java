package com.example.networking.social.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CommentDTO {
    private Long id;
    private Long postId;  // 새로 추가
    private String userId;  // Integer로 변경
    private String contentComment;
    private LocalDateTime createdAt;


}