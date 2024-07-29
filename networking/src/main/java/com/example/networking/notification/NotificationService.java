package com.example.networking.notification;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public void sendLikeNotification(LikeNotificationRequest likeNotificationRequest) {
        Optional<Notification> existingNotification = notificationRepository.findByLikerAndPostId(
                likeNotificationRequest.getLiker(), likeNotificationRequest.getPostId());

        if (existingNotification.isPresent()) {
            Notification notification = existingNotification.get();
            if (notification.isLiked()) {
                notification.setLiked(false);
                notification.setMessage(likeNotificationRequest.getLiker() + "님이 당신의 게시물의 좋아요를 취소했습니다");
            } else {
                notification.setLiked(true);
                notification.setMessage(likeNotificationRequest.getLiker() + "님이 당신의 게시물에 좋아요를 눌렀습니다");
            }
            notification.setUpdatedAt(LocalDateTime.now());
            notificationRepository.save(notification);
        } else {
            Notification notification = new Notification();
            notification.setMessage(likeNotificationRequest.getLiker() + "님이 당신의 게시물에 좋아요를 눌렀습니다");
            notification.setReceiver(likeNotificationRequest.getTargetUser());
            notification.setLiker(likeNotificationRequest.getLiker());
            notification.setPostId(likeNotificationRequest.getPostId());
            notification.setJob(false);
            notification.setLiked(true);
            LocalDateTime now = LocalDateTime.now();
            notification.setNotificationTime(now);
            notification.setCreatedAt(now);
            notification.setUpdatedAt(now);

            notificationRepository.save(notification);
        }
    }

    public List<Notification> fetchNotifications(String userId) {
        return notificationRepository.findByReceiver(userId);
    }

    public int countLikesByPostId(Long postId) {
        return notificationRepository.countByPostIdAndLikedTrue(postId);
    }

    public boolean isPostLikedByUser(String liker, Long postId) {
        return notificationRepository.findByLikerAndPostId(liker, postId).map(Notification::isLiked).orElse(false);
    }
}
