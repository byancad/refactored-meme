import { Reducer } from "redux";
import { User } from "../../services/user";
import { UserActions, UserActionTypes } from "./actions";
import { Building } from "../../services/user";

export interface UserInitialState {
  loading: boolean;
  details?: User;
  buildings?: Building[];
  error?: Error;
}

export const userInitialState: UserInitialState = {
  loading: false,
  details: undefined,
  buildings: [],
  error: undefined,
};

export const userReducer: Reducer<UserInitialState, UserActions> = (
  state: UserInitialState = userInitialState,
  action: UserActions
) => {
  switch (action.type) {
    case UserActionTypes.USER_DETAILS:
      return {
        ...state,
        loading: true,
        error: undefined,
      };
    case UserActionTypes.USER_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case UserActionTypes.USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        details: action.payload.user,
        buildings: action.payload.buildings,
      };
    default: {
      return state;
    }
  }
};
