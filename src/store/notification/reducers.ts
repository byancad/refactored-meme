import { Reducer } from "redux";
import { NotificationActions, ActionTypes } from "./actions";

export enum NotificationMessage {
  SIGN_UP_SUCCESS = "Sign up successful. Please sign in.",
  SIGN_UP_FAILURE = "Error signing up. Please make sure email domain matches approved employers",
  SIGN_IN_SUCCESS = "Welcome back!",
  SIGN_IN_FAILURE = "Error signing in. Please do better.",
  CREATE_BOOKING_SUCCESS = "Booking created successfully",
  DELETE_BOOKING_SUCCESS = "Youve deleted this booking",
}

export enum NotificationType {
  PRIMARY = "primary",
  SUCCESS = "success",
  DANGER = "danger",
  INFO = "info",
}

export type Notification = {
  id: string;
  message: NotificationMessage;
  type: NotificationType;
};

export interface NotificationInitialState {
  notifications: Notification[];
}

export const notificationInitialState: NotificationInitialState = {
  notifications: [],
};

export const notificationReducer: Reducer<
  NotificationInitialState,
  NotificationActions
> = (
  state: NotificationInitialState = notificationInitialState,
  action: NotificationActions
) => {
  switch (action.type) {
    case ActionTypes.ADD_NOTIFICATION:
      const newNotifications = [
        ...state.notifications,
        {
          id: action.payload.id,
          message: action.payload.message,
          type: action.payload.type,
        },
      ];
      return {
        ...state,
        notifications: newNotifications,
      };
    case ActionTypes.REMOVE_NOTIFICATION:
      const filteredNotifications = state.notifications.filter(
        (notification) => {
          return notification.id !== action.payload.id;
        }
      );
      return {
        ...state,
        notifications: filteredNotifications,
      };

    default: {
      return state;
    }
  }
};
