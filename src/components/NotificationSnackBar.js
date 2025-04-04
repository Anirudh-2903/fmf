import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { useNotification } from "../contexts/NotificationProvider";

export default function NotificationSnackbar() {
  const { notification, silence } = useNotification();

  if (!notification) {
    return ; 
  }

  return (
    <ToastContainer position="bottom-start" className="p-3">
      <Toast
        onClose={silence}
        show={!!notification}
        delay={5000} 
        autohide
        bg={notification.type} 
      >
        <Toast.Body>{notification.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
