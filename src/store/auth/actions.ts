import { Action } from "redux";
import { AuthenticateDto, SignInResponse } from "../../services/auth";

export enum AuthActionTypes {
  SIGN_UP = "@@auth/SIGN_UP",
  DONE_LOADING = "@@auth/DONE_LOADING",
  SIGN_UP_FAILURE = "@@auth/SIGN_UP_FAILURE",
  SIGN_IN = "@@auth/SIGN_IN",
  SIGN_IN_SUCCESS = "@@auth/SIGN_IN_SUCCESS",
  SIGN_IN_FAILURE = "@@auth/SIGN_IN_FAILURE",
  AUTHENTICATE = "@@auth/AUTHENTICATE",
}

export interface SignUp extends Action {
  type: AuthActionTypes.SIGN_UP;
  payload: AuthenticateDto;
}

export const signUp = (authenticateDto: AuthenticateDto): SignUp => {
  return {
    type: AuthActionTypes.SIGN_UP,
    payload: authenticateDto,
  };
};

interface DoneLoading extends Action {
  type: AuthActionTypes.DONE_LOADING;
}

export const doneLoading = (): DoneLoading => {
  return {
    type: AuthActionTypes.DONE_LOADING,
  };
};

interface SignUpFailure extends Action {
  type: AuthActionTypes.SIGN_UP_FAILURE;
  payload: {
    error: Error;
  };
}

export const signUpFailure = (error: Error): SignUpFailure => {
  return {
    type: AuthActionTypes.SIGN_UP_FAILURE,
    payload: { error },
  };
};

interface SignIn extends Action {
  type: AuthActionTypes.SIGN_IN;
  payload: AuthenticateDto;
}

export const signIn = (authenticateDto: AuthenticateDto): SignIn => {
  return {
    type: AuthActionTypes.SIGN_IN,
    payload: authenticateDto,
  };
};

interface SignInSuccess extends Action {
  type: AuthActionTypes.SIGN_IN_SUCCESS;
  payload: SignInResponse;
}

export const signInSuccess = (response: SignInResponse): SignInSuccess => {
  return {
    type: AuthActionTypes.SIGN_IN_SUCCESS,
    payload: response,
  };
};

interface SignInFailure extends Action {
  type: AuthActionTypes.SIGN_IN_FAILURE;
  payload: {
    error: Error;
  };
}

export const signInFailure = (error: Error): SignInFailure => {
  return {
    type: AuthActionTypes.SIGN_IN_FAILURE,
    payload: { error },
  };
};

interface Authenticate extends Action {
  type: AuthActionTypes.AUTHENTICATE;
}

export const authenticate = (): Authenticate => {
  return {
    type: AuthActionTypes.AUTHENTICATE,
  };
};

export type AuthActions =
  | SignUp
  | DoneLoading
  | SignUpFailure
  | SignIn
  | SignInSuccess
  | SignInFailure
  | Authenticate;
