package com.example.networking.social.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.networking.social.dto.CommentDTO;
import com.example.networking.social.entity.Comment;
import com.example.networking.social.entity.Post;
import com.example.networking.social.entity.User;
import com.example.networking.social.repository.CommentRepository;
import com.example.networking.social.repository.PostRepository;
import com.example.networking.social.repository.UserRepository;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;


    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    public Comment createComment(CommentDTO commentDTO) {
        Post post = postRepository.findById(commentDTO.getPostId())
            .orElseThrow(() -> new RuntimeException("Post not found"));
        User user = userRepository.findByUserId(commentDTO.getUserId())
            .orElseThrow(() -> new RuntimeException("User not found"));

        Comment comment = new Comment();
        comment.setPost(post);
        comment.setUser(user);
        comment.setContentComment(commentDTO.getContentComment());
        comment.setCreatedAt(commentDTO.getCreatedAt());

        return commentRepository.save(comment);
    }


    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }
}
