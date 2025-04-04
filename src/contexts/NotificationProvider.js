import React, { createContext, useContext, useState } from "react";

export const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null); // Start with null instead of empty object

  function notify(type, message) {
    setNotification({ type, message });
  }

  function silence() {
    setNotification(null); // Clear the notification
  }

  const value = {
    notification,
    notify,
    silence,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("No notification Context present");
  }
  return context;
}

