package com.example.networking.notification;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByReceiver(String receiver);
    Optional<Notification> findByLikerAndReceiverAndPostId(String liker, String receiver, Long postId);
    Optional<Notification> findByLikerAndPostId(String liker, Long postId); // 추가
    int countByPostIdAndLikedTrue(Long postId);
}
