package com.example.networking.dto;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class Users {
    
    private int no;
    private String userId;          // 아이디
    private String userPw;          // 비밀번호
    private String userPwCheck;     // 비밀번호 확인
    private String name;            // 이름
    private String email;           // 이메일
    private String area;            // 지역
    private String status;          // 구직여부
    private String industry;        // 직무분야
    private String edu;             // 학력
    private String skill;           // 스킬
    private String cert;            // 자격증
    private String bio;             // 경력사항
    private String company;         // 소속
    private String title;           // 직급
    private Date regDate;           // 등록시간
    private Date updDate;           // 수정시간
    private int enabled;            // 활성화 여부
    
    // 권한 목록
    List<UserAuth> authList;

    public Users() {
        
    }
    
    public Users(Users user) {
        this.no = user.getNo();
        this.userId = user.getUserId();
        this.userPw = user.getUserPw();
        this.name = user.getName();
        this.email = user.getEmail();
        this.area = user.getArea();
        this.status = user.getStatus();
        this.industry = user.getIndustry();
        this.edu = user.getEdu();
        this.skill = user.getSkill();
        this.cert = user.getCert();
        this.bio = user.getBio();
        this.company = user.getCompany();
        this.title = user.getTitle();
        this.authList = user.getAuthList();
    }
}