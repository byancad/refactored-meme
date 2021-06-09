import { Reducer } from "redux";
import { TokenActions, TokenActionTypes } from "./actions";

export interface TokenInitialState {
  linkToken: string;
  loading: boolean;
  error?: Error;
}

export const tokenInitialState: TokenInitialState = {
  loading: false,
  linkToken: "",
  error: undefined
};

export const tokenReducer: Reducer<TokenInitialState, TokenActions> = (
  state: TokenInitialState = tokenInitialState,
  action: TokenActions
) => {
  switch (action.type) {
    case TokenActionTypes.GET_LINK_TOKEN:
      return {
        ...state,
        loading: true,
        error: undefined
      };
    case TokenActionTypes.TOKEN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case TokenActionTypes.GET_LINK_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        linkToken: action.payload.link_token
      };
    default: {
      return state;
    }
  }
};
