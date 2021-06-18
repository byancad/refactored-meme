import { AllActions, InitialState } from "../index";
import { ActionsObservable, Epic } from "redux-observable";
import { switchMap, catchError, mergeMap, filter } from "rxjs/operators";
import {
  TokenActionTypes,
  getLinkTokenSuccess,
  tokenError,
  getLinkToken,
  getAccessToken,
  getAccessTokenSuccess
} from "./actions";
import { isOfType } from "typesafe-actions";
import { of, from, merge } from "rxjs";
import { postLinkToken, postAccessToken } from "../../services/token";

export const tokenDetailsEpic: Epic<AllActions, AllActions, InitialState> = (
  action$: ActionsObservable<AllActions>
) =>
  action$.pipe(
    filter(isOfType(TokenActionTypes.GET_LINK_TOKEN)),
    switchMap(action => {
      return from(postLinkToken()).pipe(
        mergeMap(data => [getLinkTokenSuccess(data)]),
        catchError(error => merge(of(tokenError(error))))
      );
    })
  );

export const getTokenDetailsEpic: Epic<AllActions, AllActions, InitialState> = (
  action$: ActionsObservable<AllActions>
) =>
  action$.pipe(
    filter(isOfType(TokenActionTypes.GET_ACCESS_TOKEN)),
    switchMap(action => {
      return from(postAccessToken(action.payload)).pipe(
        mergeMap(data => [getAccessTokenSuccess()]),
        catchError(error => merge(of(tokenError(error))))
      );
    })
  );

export const TokenEpics = [tokenDetailsEpic, getTokenDetailsEpic];
