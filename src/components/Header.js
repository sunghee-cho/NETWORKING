import React from "react";
import "../styles/Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        NET<span>WORKING</span>
      </div>
      <nav>
        <a href="/">홈</a>
        <a href="/joblist">채용 공고</a>
        <a href="/chat">메시지</a>
        <a href="/notifications" className="active">
          알림
        </a>
      </nav>
    </header>
  );
};

export default Header;