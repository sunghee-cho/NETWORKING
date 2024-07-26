// package com.example.networking.social.entity;

// import java.sql.Blob;
// import java.time.LocalDateTime;
// import java.util.List;

// import jakarta.persistence.Column;
// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.OneToMany;
// import lombok.Getter;
// import lombok.Setter;

// @Entity
// @Getter
// @Setter
// public class User {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Integer no; // Integer로 변경
 
//     // column 이름 넣기 -- 추가
//     @Column(name = "USER_ID", nullable = false)
//     private String userId; 

//     @Column(name = "NAME")
//     private String username;

//     @Column(name = "EMAIL")
//     private String email;

//     @Column(name = "USER_PW")
//     private String password;

//     @Column(name = "AREA")
//     private String area;

//     @Column(name = "STATUS")
//     private String jobStatus;

//     @Column(name = "INDUSTRY")
//     private String industry;

//     @Column(name = "EDU")
//     private String education;

//     @Column(name = "SKILL")
//     private String skill;

//     @Column(name = "CERT")
//     private String cert;

//     @Column(name = "BIO")
//     private String bio;

//     @Column(name = "COMPANY")
//     private String company;

//     @Column(name = "TITLE")
//     private String title;

//     @Column(name = "REG_DATE")
//     private LocalDateTime createdAt;

//     @Column(name = "UPD_DATE")
//     private LocalDateTime updatedAt;

//     // private Blob profileImage;
//     // private Blob resumeFile;

//     @OneToMany(mappedBy = "user")
//     private List<Post> posts;
// }
