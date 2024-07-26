package com.example.networking.notification;

public class LikeNotificationRequest {
    private String liker;
    private String targetUser;
    private Long postId;

    // 기본 생성자
    public LikeNotificationRequest() {}

    // 모든 필드를 포함한 생성자
    public LikeNotificationRequest(String liker, String targetUser, Long postId) {
        this.liker = liker;
        this.targetUser = targetUser;
        this.postId = postId;
    }

    // Getters and Setters
    public String getLiker() {
        return liker;
    }

    public void setLiker(String liker) {
        this.liker = liker;
    }

    public String getTargetUser() {
        return targetUser;
    }

    public void setTargetUser(String targetUser) {
        this.targetUser = targetUser;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }
}