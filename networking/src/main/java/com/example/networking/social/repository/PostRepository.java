package com.example.networking.social.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.networking.social.entity.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
}