import { Epic } from "redux-observable";
import { timer } from "rxjs";
import { filter, map, delayWhen } from "rxjs/operators";
import { isOfType } from "typesafe-actions";
import {
  NotificationActions,
  ActionTypes,
  removeNotification,
} from "./actions";
import { NotificationInitialState } from "./reducers";

export const createMessageEpic: Epic<
  NotificationActions,
  NotificationActions,
  NotificationInitialState
> = (action$) =>
  action$.pipe(
    filter(isOfType(ActionTypes.ADD_NOTIFICATION)),
    delayWhen(() => timer(5000)),
    map((action) => removeNotification(action.payload))
  );

export const NotificationEpics = [createMessageEpic];
