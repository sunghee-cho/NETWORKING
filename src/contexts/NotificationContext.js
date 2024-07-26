import React, { createContext, useState, useEffect } from "react";
import { subscribeToNotifications } from "../apis/notificationApi";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children, userId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const eventSource = subscribeToNotifications(userId);
    eventSource.onmessage = (event) => {
      setNotifications((prev) => [...prev, event.data]);
    };

    return () => {
      eventSource.close();
    };
  }, [userId]);

  return (
    <NotificationContext.Provider value={notifications}>
      {children}
    </NotificationContext.Provider>
  );
};
