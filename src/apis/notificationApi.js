import axios from "axios";
import Cookies from "js-cookie";

export const sendLikeNotification = async (likeNotificationRequest, token) => {
  console.log("Token in sendLikeNotification:", token);
  const response = await axios.post(
    `http://localhost:8080/api/notifications/like`,
    likeNotificationRequest,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error("Failed to send like notification");
  }
};

export const fetchNotifications = async (userId) => {
  const token = Cookies.get("accessToken");
  console.log("Token in fetchNotifications:", token);
  const response = await axios.get(
    `http://localhost:8080/api/notifications/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (response.status !== 200) {
    throw new Error("Failed to fetch notifications");
  }
  return response.data;
};

export const isPostLikedByUser = async (postId, liker) => {
  const token = Cookies.get("accessToken");
  const response = await axios.get(
    `http://localhost:8080/api/notifications/isLiked/${postId}/${liker}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (response.status !== 200) {
    throw new Error("Failed to fetch like status");
  }
  return response.data;
};

export const countLikesByPostId = async (postId) => {
  const token = Cookies.get("accessToken");
  const response = await axios.get(
    `http://localhost:8080/api/notifications/likes/${postId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (response.status !== 200) {
    throw new Error("Failed to fetch like count");
  }
  return response.data;
};
