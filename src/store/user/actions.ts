import { Action, ActionCreator } from "redux";
import { UserDetailsDto } from "../../services/user";

export enum UserActionTypes {
  USER_DETAILS = "@@user/USER_DETAILS",
  USER_DETAILS_SUCCESS = "@@user/USER_DETAILS_SUCCESS",
  USER_DETAILS_FAILURE = "@@user/USER_DETAILS_FAILURE",
}

interface UserDetails extends Action {
  type: UserActionTypes.USER_DETAILS;
}

export const userDetails: ActionCreator<UserDetails> = () => {
  return {
    type: UserActionTypes.USER_DETAILS,
  };
};

interface UserDetailsFailure extends Action {
  type: UserActionTypes.USER_DETAILS_FAILURE;
  payload: {
    error: Error;
  };
}

export const userDetailsFailure: ActionCreator<UserDetailsFailure> = (
  error: Error
) => {
  return {
    type: UserActionTypes.USER_DETAILS_FAILURE,
    payload: { error },
  };
};

interface UserDetailsSuccess extends Action {
  type: UserActionTypes.USER_DETAILS_SUCCESS;
  payload: UserDetailsDto;
}

export const userDetailsSuccess: ActionCreator<UserDetailsSuccess> = (
  userDetailsDto: UserDetailsDto
) => {
  return {
    type: UserActionTypes.USER_DETAILS_SUCCESS,
    payload: userDetailsDto,
  };
};

export type UserActions = UserDetails | UserDetailsSuccess | UserDetailsFailure;
