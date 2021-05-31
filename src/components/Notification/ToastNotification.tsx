import React from "react";
import { Toast } from "react-bootstrap";
import { NotificationType } from "../../store/notification/reducers";

type ToastNotificationProps = {
  id: string;
  header?: string;
  message: string;
  removeToast: (id: string) => void;
  type: NotificationType;
};

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  id,
  message,
  removeToast,
  type,
}) => {
  return (
    <Toast
      onClose={() => {
        removeToast(id);
      }}
      show={true}
      className={`${type}`}
    >
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};
