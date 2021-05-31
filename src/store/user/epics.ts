import { ActionsObservable, Epic } from "redux-observable";
import { of, from, merge } from "rxjs";
import { switchMap, catchError, mergeMap, filter } from "rxjs/operators";
import { isOfType } from "typesafe-actions";
import { AllActions, InitialState } from "../index";
import {
  UserActionTypes,
  userDetailsSuccess,
  userDetailsFailure,
} from "./actions";
import { getUserDetails } from "../../services/user";
import { authenticate, doneLoading } from "../auth/actions";

export const userDetailsEpic: Epic<AllActions, AllActions, InitialState> = (
  action$: ActionsObservable<AllActions>
) =>
  action$.pipe(
    filter(isOfType(UserActionTypes.USER_DETAILS)),
    switchMap((action) => {
      return from(getUserDetails()).pipe(
        mergeMap((data) => [userDetailsSuccess(data), authenticate()]),
        catchError((error) =>
          merge(of(userDetailsFailure(error)), of(doneLoading()))
        )
      );
    })
  );

export const UserEpics = [userDetailsEpic];
