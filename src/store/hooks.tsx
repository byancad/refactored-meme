import React from "react";
import { useSelector } from "react-redux";
import { InitialState } from "../store";
import { AuthInitialState } from "../store/auth/reducers";
import { BookingInitialState } from "./booking/reducers";
import { BuildingInitialState } from "./building/reducers";
import { UserInitialState } from "./user/reducers";

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

export function useBuildingState() {
  const building = useSelector<InitialState, BuildingInitialState>(
    (state) => state.building
  );

  return building;
}

export function useBookingState() {
  const booking = useSelector<InitialState, BookingInitialState>(
    (state) => state.booking
  );

  return booking;
}
