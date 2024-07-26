package com.example.networking.social.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.networking.social.dto.PostDTO;
import com.example.networking.social.service.PostService;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping
    public List<PostDTO> getAllPosts() {
        return postService.getAllPosts();
    }

    @PostMapping(consumes = "multipart/form-data")
    public PostDTO createPost(
            @RequestParam("userId") String userId, // String으로 유지
            @RequestParam("contentPost") String contentPost,
            @RequestParam(value = "imagePost", required = false) MultipartFile imagePost) {

        PostDTO postDTO = new PostDTO();
        postDTO.setUserId(userId); // userId를 그대로 설정
        postDTO.setContentPost(contentPost);
        if (imagePost != null && !imagePost.isEmpty()) {
            String imagePath = saveImage(imagePost);
            postDTO.setImagePost(imagePath);
        }

        return postService.createPost(postDTO);
    }

    @DeleteMapping("/{postId}")
    public void deletePost(@PathVariable Long postId) {
        postService.deletePost(postId);
    }

    private String saveImage(MultipartFile imageFile) {
        String filePath = "images/" + imageFile.getOriginalFilename();
        try {
            imageFile.transferTo(new java.io.File(filePath));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return filePath;
    }
}