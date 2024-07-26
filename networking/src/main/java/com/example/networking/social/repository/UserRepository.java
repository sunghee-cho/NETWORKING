package com.example.networking.social.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.networking.dto.Users;

public interface UserRepository extends JpaRepository<Users, Integer> {
    Optional<Users> findByUserId(String userId); // userId로 조회할 수 있도록 메서드 추가
}