package com.example.networking.social.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.networking.social.dto.PostDTO;
import com.example.networking.social.entity.Post;
import com.example.networking.social.entity.User;
import com.example.networking.social.repository.PostRepository;
import com.example.networking.social.repository.UserRepository;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    public List<PostDTO> getAllPosts() {
        return postRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public PostDTO createPost(PostDTO postDTO) {
        Post post = convertToEntity(postDTO);
        Post savedPost = postRepository.save(post);
        return convertToDto(savedPost);
    }

    public void deletePost(Long postId) {
        postRepository.deleteById(postId);
    }

    private PostDTO convertToDto(Post post) {
        PostDTO postDTO = new PostDTO();
        postDTO.setId(post.getId());
        postDTO.setUserId(post.getUser().getUserId()); // userId를 String으로 설정
        postDTO.setContentPost(post.getContentPost());
        postDTO.setImagePost(post.getImagePost());
        postDTO.setLikesCount(post.getLikesCount());
        postDTO.setCreatedAt(post.getCreatedAt());
        return postDTO;
    }

    private Post convertToEntity(PostDTO postDTO) {
        Post post = new Post();
        post.setId(postDTO.getId());
        User user = userRepository.findByUserId(postDTO.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        post.setUser(user);
        post.setContentPost(postDTO.getContentPost());
        post.setImagePost(postDTO.getImagePost());
        post.setLikesCount(postDTO.getLikesCount());
        post.setCreatedAt(postDTO.getCreatedAt());
        return post;
    }
}
