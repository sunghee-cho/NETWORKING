import React, { useContext } from "react";
import "../styles/Header.css";
import { NavLink } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContextProvider";

const Header = () => {
  // ✅ isLogin   : 로그인 여부 - Y(true), N(false)
  // ✅ logout()  : 로그아웃 함수 - setLogin(false)
  const { isLogin, login, logout } = useContext(LoginContext);

  return (
    <header className="header">
      <div className="logo">
        NET<span className="logo-span">WORKING</span>
      </div> 
      <nav>
        <NavLink exact to="/" activeClassName="active">
          홈
        </NavLink>
        <NavLink to="/joblist" activeClassName="active">
          채용 공고
        </NavLink>
        <NavLink to="/chat" activeClassName="active">
          메시지
        </NavLink>
        <NavLink to="/notifications" activeClassName="active">
          알림
        </NavLink>
      </nav>
      <div className="util">
        {!isLogin ? (
          /* 비로그인 시 */
          <ul>
            <li>
              <NavLink to="/login">로그인</NavLink>&nbsp;&nbsp;&nbsp;
              <NavLink to="/join">회원가입</NavLink>
            </li>
          </ul>
        ) : (
          /* 로그인 시 */
          <ul>
            <li>
              <NavLink to="/User">마이페이지</NavLink>&nbsp;&nbsp;&nbsp;
              <button className="Link" onClick={() => logout()}>
                로그아웃
              </button>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
