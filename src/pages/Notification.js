import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Notification/Sidebar";
import "../styles/Notification/notification.css";

const Notifications = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRef = useRef(null);

  const toggleMenu = (index) => {
    setActiveMenu(activeMenu === index ? null : index);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setActiveMenu(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="notifications-page">
      <div className="notifications">
        <div className="notifications__tabs">
          <button className="active">전체</button>
          <button>업데이트</button>
          <button>태그</button>
        </div>
        <div className="notifications-list">
          {[
            {
              text: "Hyundai Motor Company (현대자동차) [ICT] Frontend Developer 외 맞춤 추천 채용공고 9개",
              job: true,
            },
            { text: "000님이 회원님의 게시물을 좋아합니다.", job: false },
            { text: "000님이 회원님을 팔로우하기 시작했습니다.", job: false },
            {
              text: "대외홍보 서비스 업계 사업체 소유주인 사람이 회원님을 조회했습니다.",
              job: false,
            },
          ].map((notification, index) => (
            <div
              className="notification"
              key={index}
              style={{ position: "relative" }}
            >
              {notification.job ? (
                <div className="notification__job">
                  <p>{notification.text}</p>
                  <a className="notification__job-view">채용 공고 보기</a>
                </div>
              ) : (
                <p>{notification.text}</p>
              )}
              <button
                className="more-options"
                onClick={() => toggleMenu(index)}
              >
                <i className="fa-solid fa-ellipsis"></i>
              </button>
              {activeMenu === index && (
                <div className="options-menu" ref={menuRef}>
                  <button>알림 삭제</button>
                  <button>이 알림 종류 받지 않기</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Sidebar />
    </div>
  );
};

export default Notifications;