import React from 'react';
import '../styles/Socialcss/css_social.css';

const Header = () => {
    return (
      <header className="header">
        <div className="logo">
          NET<span>WORKING</span>
        </div>
        <nav>
          <a href="/">홈</a>
          <a href="/jobs">채용 공고</a>
          <a href="/messages">메시지</a>
          <a href="/notifications" className="active">
            알림
          </a>
        </nav>
      </header>
    );
  };
  
  export default Header;