import { Action } from "redux";
import { BuildingDetailsDto } from "../../services/building";

export enum BuildingActionTypes {
  BUILDING_DETAILS = "@@building/BUILDING_DETAILS",
  BUILDING_DETAILS_SUCCESS = "@@building/BUILDING_DETAILS_SUCCESS",
  BUILDING_DETAILS_FAILURE = "@@building/BUILDING_DETAILS_FAILURE",
}

interface BuildingDetails extends Action {
  type: BuildingActionTypes.BUILDING_DETAILS;
  payload: {
    buildingId: number;
  };
}

export const buildingDetails = (buildingId: number): BuildingDetails => {
  return {
    type: BuildingActionTypes.BUILDING_DETAILS,
    payload: { buildingId },
  };
};

interface BuildingDetailsFailure extends Action {
  type: BuildingActionTypes.BUILDING_DETAILS_FAILURE;
  payload: {
    error: Error;
  };
}

export const buildingDetailsFailure = (
  error: Error
): BuildingDetailsFailure => {
  return {
    type: BuildingActionTypes.BUILDING_DETAILS_FAILURE,
    payload: { error },
  };
};

interface BuildingDetailsSuccess extends Action {
  type: BuildingActionTypes.BUILDING_DETAILS_SUCCESS;
  payload: BuildingDetailsDto;
}

export const buildingDetailsSuccess = (
  buildingDetailsDto: BuildingDetailsDto
): BuildingDetailsSuccess => {
  return {
    type: BuildingActionTypes.BUILDING_DETAILS_SUCCESS,
    payload: buildingDetailsDto,
  };
};

export type BuildingActions =
  | BuildingDetails
  | BuildingDetailsSuccess
  | BuildingDetailsFailure;
