import React from "react";
import "../../styles/Job/Profile.css";
import profileImage from "../../assets/icons/profileicon.png";

const Profile = () => {
  return (
    <div className="profile">
      <div className="profile-img">
        <img src={profileImage} alt="Profile" />
      </div>
      <div className="profile-name">User</div>
      <div className="profile-status">프론트엔드개발자</div>
      <div className="profile-info">
        <span>팔로워</span>
        <span className="icon">+</span>
      </div>
      <div className="profile-info">
        <span>프로필 수정하기</span>
      </div>
    </div>
  );
};

export default Profile;
