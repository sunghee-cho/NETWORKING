package com.example.networking.social.entity;

import java.time.LocalDateTime;
import java.util.List;

import com.example.networking.dto.Users;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "no") // no로 바꿈
    private Users user;

    @Column(name = "content_post", nullable = true, length = 255) //  새로 추가 
    private String contentPost;

    @Column(name = "image_post", nullable = true, length = 255)  //  새로 추가 
    private String imagePost;

    @Column(name = "likes_count")  //  새로 추가 
    private int likesCount;

    // 새로 추가 
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Comment> comments;
}