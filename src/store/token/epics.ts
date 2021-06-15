import { AllActions, InitialState } from "../index";
import { ActionsObservable, Epic } from "redux-observable";
import { switchMap, catchError, mergeMap, filter } from "rxjs/operators";
import { TokenActionTypes, getLinkTokenSuccess, tokenError } from "./actions";
import { isOfType } from "typesafe-actions";
import { of, from, merge } from "rxjs";
import { postLinkToken } from "../../services/token";

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

export const TokenEpics = [tokenDetailsEpic];
