package com.example.networking.social.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.networking.social.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
