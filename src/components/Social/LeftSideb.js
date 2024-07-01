import React from "react";
import profileImage from "../../assets/images/고양이 프로필.png";

const LeftSideb = () => {
  return (
    <div className="leftsidebar">
      <div className="profile">
        <img
          src={profileImage}
          alt="Profile Picture"
          style={{ borderRadius: "50%" }}
        />
        <p style={{ fontWeight: "bold" }}>사용자 이름</p>
        <button className="button">설정</button>
      </div>
    </div>
  );
};

export default LeftSideb;
