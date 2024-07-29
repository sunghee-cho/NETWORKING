import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/Job/Profile.css";
import profileImage from "../../assets/icons/profileicon.png";
import { LoginContext } from "../../contexts/LoginContextProvider";

const Profile = () => {
  const { isLogin, userInfo, loginCheck } = useContext(LoginContext);

  useEffect(() => {
    const checkLoginStatus = async () => {
      await loginCheck(); 
    };
    checkLoginStatus(); 
  }, []); 

  if (!isLogin) {
    return (
      <div className="profile">
        <div className="profile-img">
          <Link to="/login">
            <img src={profileImage} alt="Profile" />
          </Link>
        </div>
        <div className="profile-login">
          <Link to="/login">로그인 해주세요</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="profile">
      <div className="profile-img">
        <Link to="/UserForm">
          <img src={userInfo?.profileImage || profileImage} alt="Profile" />
        </Link>
      </div>
      <div className="profile-name">{userInfo?.name || "사용자 이름"}</div>
      <div className="profile-status">{userInfo?.jobTitle || "프론트엔드개발자"}</div>
      <div className="profile-info">
        <span>
          <i className="fas fa-user-friends"></i> 팔로워   {userInfo?.followers || 0}
        </span>
        <span className="icon">+</span>
      </div>
      <div className="profile-info">
        <Link to="/UserForm">
          <span>
            <i className="fas fa-edit"></i> 프로필 수정하기
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
