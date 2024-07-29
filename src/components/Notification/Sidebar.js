import React from "react";
import ad from "../../assets/images/ad.png";
import "../../styles/notification/sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div>
        <img src={ad} alt="ad" />
      </div>
      <div className="company-info">
        <ul>
          <li>
            <a href="#">회사소개</a>
          </li>
          <li>
            <a href="#">고객센터</a>
          </li>
          <li>
            <a href="#">개인정보와 약관</a>
          </li>
          <li>
            <a href="#">광고</a>
          </li>
        </ul>
      </div>
      <div className="social-links">
        <a href="#">Facebook</a>
        <a href="#">YouTube</a>
        <a href="#">Instagram</a>
      </div>
    </div>
  );
};

export default Sidebar;
