import { Action, ActionCreator } from "redux";
import {
  Notification,
  NotificationType,
  NotificationMessage,
} from "./reducers";
import shortid from "shortid";

export enum ActionTypes {
  ADD_NOTIFICATION = "@@notifications/ADD_NOTIFICATION",
  REMOVE_NOTIFICATION = "@@notifications/REMOVE_NOTIFICATION",
}

interface addNotificationAction extends Action {
  type: ActionTypes.ADD_NOTIFICATION;
  payload: Notification;
}

interface removeNotificationAction extends Action {
  type: ActionTypes.REMOVE_NOTIFICATION;
  payload: { id: string };
}

export type NotificationActions =
  | addNotificationAction
  | removeNotificationAction;

export const addNotification: ActionCreator<addNotificationAction> = (payload: {
  message: NotificationMessage;
  type: NotificationType;
}) => {
  return {
    type: ActionTypes.ADD_NOTIFICATION,
    payload: {
      id: shortid.generate(),
      message: payload.message,
      type: payload.type,
    },
  };
};

export const removeNotification: ActionCreator<removeNotificationAction> = (
  payload: any
) => {
  return {
    type: ActionTypes.REMOVE_NOTIFICATION,
    payload,
  };
};
