package com.example.networking.social.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.networking.social.dto.CommentDTO;
import com.example.networking.social.entity.Comment;
import com.example.networking.social.entity.Post;
import com.example.networking.dto.Users;
import com.example.networking.social.repository.CommentRepository;
import com.example.networking.social.repository.PostRepository;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired 
    private PostRepository postRepository;

    public List<CommentDTO> getAllComments() {
        return commentRepository.findAll().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    public CommentDTO createComment(CommentDTO commentDTO) {
        // Fetch the Post entity
        Post post = postRepository.findById(commentDTO.getPostId())
            .orElseThrow(() -> new RuntimeException("Post not found with id: " + commentDTO.getPostId()));

        // Get the User entity from the Post
        Users user = post.getUser();

        // Convert CommentDTO to Comment entity
        Comment comment = convertToEntity(commentDTO);
        comment.setPost(post);
        comment.setUser(user);

        // Save the Comment entity
        Comment savedComment = commentRepository.save(comment);
        return convertToDTO(savedComment); // Ensure this method is accessible
    }

    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }

    // Utility method to convert Comment entity to CommentDTO
    public CommentDTO convertToDTO(Comment comment) {
        CommentDTO commentDTO = new CommentDTO();
        commentDTO.setId(comment.getId());
        commentDTO.setPostId(comment.getPost().getId());
        // commentDTO.setUserId(comment.getUser().getId());
        commentDTO.setContentComment(comment.getContentComment());
        commentDTO.setCreatedAt(comment.getCreatedAt());
        return commentDTO;
    }

    // Utility method to convert CommentDTO to Comment entity
    private Comment convertToEntity(CommentDTO commentDTO) {
        Comment comment = new Comment();
        comment.setId(commentDTO.getId());
        comment.setContentComment(commentDTO.getContentComment());
        comment.setCreatedAt(commentDTO.getCreatedAt());
        return comment;
    }
}
