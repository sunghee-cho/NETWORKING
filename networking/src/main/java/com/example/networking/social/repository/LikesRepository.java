package com.example.networking.social.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.networking.social.entity.Likes;

public interface LikesRepository extends JpaRepository<Likes, Long> {
}