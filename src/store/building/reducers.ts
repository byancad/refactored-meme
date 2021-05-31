import { Reducer } from "redux";
import { BuildingActions, BuildingActionTypes } from "./actions";
import { Room, Event, Hour } from "../../services/building";

type BuildDetails = {
  rooms: Room[];
  events: Event[];
  hours: Hour[];
};

type BuildingHash = {
  [buildingId: number]: BuildDetails;
};

export interface BuildingInitialState {
  loading: boolean;
  details: BuildingHash;
  error?: Error;
}

export const buildingInitialState: BuildingInitialState = {
  loading: false,
  details: {},
  error: undefined,
};

export const buildingReducer: Reducer<BuildingInitialState, BuildingActions> = (
  state: BuildingInitialState = buildingInitialState,
  action: BuildingActions
) => {
  switch (action.type) {
    case BuildingActionTypes.BUILDING_DETAILS:
      return {
        ...state,
        loading: true,
        error: undefined,
      };
    case BuildingActionTypes.BUILDING_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case BuildingActionTypes.BUILDING_DETAILS_SUCCESS:
      let current = state.details;

      if (action && action.payload && action.payload.rooms) {
        current = {
          ...current,
          [`${action.payload.rooms[0].buildingId}`]: action.payload,
        };
      }
      return {
        ...state,
        loading: false,
        details: current,
      };
    default: {
      return state;
    }
  }
};
