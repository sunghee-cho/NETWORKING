import React, { useContext } from "react";
import { sendLikeNotification } from "../apis/notificationApi";
import { LoginContext } from "../contexts/LoginContextProvider";
import * as Swal from "../apis/alert";

const LikeButton = ({ targetUser, postId, onLike }) => {
  const { isLogin, userInfo } = useContext(LoginContext);

  const handleLike = async () => {
    if (!isLogin) {
      Swal.alert(
        "로그인 필요",
        "로그인 후 좋아요를 누를 수 있습니다.",
        "warning"
      );
      return;
    }
    try {
      await sendLikeNotification(userInfo.userId, targetUser);
      onLike(postId);
    } catch (error) {
      Swal.alert("오류", "좋아요 알림을 보내는 데 실패했습니다.", "error");
    }
  };

  return <button onClick={handleLike}>❤️</button>;
};

export default LikeButton;