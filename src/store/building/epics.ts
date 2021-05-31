import { AllActions, InitialState } from "../index";
import { ActionsObservable, Epic } from "redux-observable";
import { switchMap, catchError, mergeMap, filter } from "rxjs/operators";
import {
  BuildingActionTypes,
  buildingDetailsSuccess,
  buildingDetailsFailure,
} from "./actions";
import { isOfType } from "typesafe-actions";
import { of, from, merge } from "rxjs";
import { getBuildingDetails } from "../../services/building";

export const buildingDetailsEpic: Epic<AllActions, AllActions, InitialState> = (
  action$: ActionsObservable<AllActions>
) =>
  action$.pipe(
    filter(isOfType(BuildingActionTypes.BUILDING_DETAILS)),
    switchMap((action) => {
      return from(getBuildingDetails(action.payload.buildingId)).pipe(
        mergeMap((data) => [buildingDetailsSuccess(data)]),
        catchError((error) => merge(of(buildingDetailsFailure(error))))
      );
    })
  );

export const BuildingEpics = [buildingDetailsEpic];
