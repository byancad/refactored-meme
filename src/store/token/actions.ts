import { Action, ActionCreator } from "redux";

import {
  AccessTokenRequestDto,
  LinkTokenResponseDto
} from "../../services/token";

export enum TokenActionTypes {
  TOKEN_ERROR = "@@token/ERROR",
  GET_LINK_TOKEN = "@@token/GET_LINK_TOKEN",
  GET_LINK_TOKEN_SUCCESS = "@@token/GET_LINK_TOKEN_SUCCESS",
  GET_ACCESS_TOKEN = "@@token/GET_ACCESS_TOKEN",
  GET_ACCESS_TOKEN_SUCCESS = "@@token/GET_ACCESS_TOKEN_SUCCESS"
}

interface GetAccessToken extends Action {
  type: TokenActionTypes.GET_ACCESS_TOKEN;
  payload: AccessTokenRequestDto;
}

export const getAccessToken: ActionCreator<GetAccessToken> = (
  token: string
) => {
  return {
    type: TokenActionTypes.GET_ACCESS_TOKEN,
    payload: { publicToken: token }
  };
};

interface GetAccessTokenSuccess extends Action {
  type: TokenActionTypes.GET_ACCESS_TOKEN_SUCCESS;
}

export const getAccessTokenSuccess: ActionCreator<GetAccessTokenSuccess> = () => {
  return {
    type: TokenActionTypes.GET_ACCESS_TOKEN_SUCCESS
  };
};

interface GetLinkToken extends Action {
  type: TokenActionTypes.GET_LINK_TOKEN;
}

export const getLinkToken: ActionCreator<GetLinkToken> = () => {
  return {
    type: TokenActionTypes.GET_LINK_TOKEN
  };
};

interface TokenError extends Action {
  type: TokenActionTypes.TOKEN_ERROR;
  payload: {
    error: Error;
  };
}

export const tokenError: ActionCreator<TokenError> = (error: Error) => {
  return {
    type: TokenActionTypes.TOKEN_ERROR,
    payload: { error }
  };
};

interface GetLinkTokenSuccess extends Action {
  type: TokenActionTypes.GET_LINK_TOKEN_SUCCESS;
  payload: LinkTokenResponseDto;
}

export const getLinkTokenSuccess: ActionCreator<GetLinkTokenSuccess> = (
  response: LinkTokenResponseDto
) => {
  return {
    type: TokenActionTypes.GET_LINK_TOKEN_SUCCESS,
    payload: response
  };
};

export type TokenActions =
  | GetLinkToken
  | GetLinkTokenSuccess
  | TokenError
  | GetAccessToken
  | GetAccessTokenSuccess;
