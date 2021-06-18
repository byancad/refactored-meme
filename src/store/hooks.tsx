import React from "react";
import { useSelector } from "react-redux";
import { InitialState } from "../store";
import { AuthInitialState } from "../store/auth/reducers";
import { UserInitialState } from "./user/reducers";
import { TokenInitialState } from "./token/reducers";

export function useAuthState() {
  const auth = useSelector<InitialState, AuthInitialState>(
    (state) => state.auth
  );

  return auth;
}

export function useUserState() {
  const user = useSelector<InitialState, UserInitialState>(
    (state) => state.user
  );

  return user;
}

export function useTokenState() {
  const tokenState = useSelector<InitialState, TokenInitialState>(
    (state) => state.token
  );

  return tokenState;
}
