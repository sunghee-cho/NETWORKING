package com.example.networking.social.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.networking.social.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    Optional<User> findByUserId(String userId); // userId로 조회할 수 있도록 메서드 추가
}
