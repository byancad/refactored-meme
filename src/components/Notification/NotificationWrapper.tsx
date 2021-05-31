import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { InitialState } from "../../store";
import { NotificationInitialState } from "../../store/notification/reducers";
import { ToastNotification } from "./ToastNotification";
import { removeNotification } from "../../store/notification/actions";
import "./toast.css";

type NotificationWrapperProps = {};

export const ToastWrapper: React.FC<NotificationWrapperProps> = () => {
  const dispatch = useDispatch();
  const notifications = useSelector<InitialState, NotificationInitialState>(
    (state) => state.notifications
  );

  const removeToast = (id: string) => {
    dispatch(removeNotification({ id }));
  };

  return (
    <div aria-live="polite" aria-atomic="true" className="toast__wrapper">
      <div className="toast__div">
        {notifications.notifications.map((notification) => {
          const { id, message, type } = notification;
          return (
            <ToastNotification
              key={id}
              id={id}
              message={message}
              removeToast={removeToast}
              type={type}
            />
          );
        })}
      </div>
    </div>
  );
};
