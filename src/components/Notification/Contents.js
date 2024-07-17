import React, { useState, useEffect, useRef, useContext } from "react";
import { fetchNotifications } from "../../apis/notificationApi";
import { LoginContext } from "../../contexts/LoginContextProvider";
import "../../styles/Notification/notification.css";

const Contents = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const { userInfo } = useContext(LoginContext);
  const menuRef = useRef(null);

  useEffect(() => {
    const loadNotifications = async () => {
      if (userInfo) {
        try {
          const data = await fetchNotifications(userInfo.userId);
          setNotifications(data);
        } catch (error) {
          console.error("Failed to fetch notifications:", error);
        }
      }
    };

    loadNotifications();
  }, [userInfo]);

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
    <div className="notifications">
      <div className="notifications__tabs">
        <button className="active">전체</button>
        <button>업데이트</button>
        <button>태그</button>
      </div>
      <div className="notifications-list">
        {notifications.map((notification, index) => (
          <div
            className="notification"
            key={index}
            style={{ position: "relative" }}
          >
            <p>{notification.notificationContent}</p>
            <button className="more-options" onClick={() => toggleMenu(index)}>
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
  );
};

export default Contents;