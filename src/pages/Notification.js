import React from "react";
import Sidebar from "../components/Notification/Sidebar";
import Contents from "../components/Notification/Contents";
import "../styles/Notification/notification.css";

const Notifications = () => {
  return (
    <div className="notifications-page">
      <div className="notification-main">
        <Contents />
        <Sidebar />
      </div>
    </div>
  );
};

export default Notifications;