package com.example.networking.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import jakarta.persistence.Table;


// 회원 권한
@Data
@Entity
@Table(name = "user_auth") 
public class UserAuth {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int authNo;
    private String userId;
    private String auth;

    @ManyToOne
    private Users user;

    public UserAuth() {}

    public UserAuth(String userId, String auth) {
        this.userId = userId;
        this.auth = auth;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }
}
