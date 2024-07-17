export const sendLikeNotification = async (liker, targetUser, postId) => {
    const token = localStorage.getItem("token"); // JWT 토큰 가져오기
    console.log("Token in sendLikeNotification:", token); // 디버그 로그 추가
    const response = await fetch("http://localhost:8080/api/notifications/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // JWT 토큰 헤더에 추가
      },
      body: JSON.stringify({ liker, targetUser, postId }),
    });
  
    if (!response.ok) {
      throw new Error("Failed to send like notification");
    }
  };
  
  export const fetchNotifications = async (userId) => {
    const token = localStorage.getItem("token"); // JWT 토큰 가져오기
    console.log("Token in fetchNotifications:", token); // 디버그 로그 추가
    const response = await fetch(
      `http://localhost:8080/api/notifications/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // JWT 토큰 헤더에 추가
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch notifications");
    }
    return response.json();
  };