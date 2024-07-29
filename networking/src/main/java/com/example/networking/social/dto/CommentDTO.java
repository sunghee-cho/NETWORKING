package com.example.networking.social.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CommentDTO {
    private Long id;
    private Long postId;
    private String userId;
    private String contentComment;
    private LocalDateTime createdAt;


}
