import { Reducer } from "redux";
import { BookingActions, BookingActionTypes } from "./actions";
import { Booking } from "../../services/booking";

export type RoomBookings = {
  [roomId: number]: Booking[];
};

export interface BookingInitialState {
  loading: boolean;
  userBookings: Booking[];
  roomBookings: RoomBookings;
  error?: Error;
}

export const bookingInitialState: BookingInitialState = {
  loading: false,
  userBookings: [],
  roomBookings: {},
  error: undefined,
};

export const bookingReducer: Reducer<BookingInitialState, BookingActions> = (
  state: BookingInitialState = bookingInitialState,
  action: BookingActions
) => {
  switch (action.type) {
    case BookingActionTypes.CREATE_BOOKING:
      return {
        ...state,
        loading: true,
        error: undefined,
      };
    case BookingActionTypes.DELETE_BOOKING:
      return {
        ...state,
        loading: true,
        error: undefined,
      };
    case BookingActionTypes.BOOKING_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case BookingActionTypes.BOOKING_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case BookingActionTypes.USER_BOOKINGS:
      return {
        ...state,
        loading: true,
        error: undefined,
      };
    case BookingActionTypes.USER_BOOKINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        userBookings: action.payload,
      };
    case BookingActionTypes.ROOM_BOOKINGS:
      return {
        ...state,
        loading: true,
        error: undefined,
      };
    case BookingActionTypes.ROOM_BOOKINGS_SUCCESS:
      let bookings = state.roomBookings;
      if (action && action.payload && action.payload[0]) {
        bookings = {
          [`${action.payload[0].roomId}`]: action.payload,
        };
      }

      return {
        ...state,
        loading: false,
        roomBookings: bookings,
      };
    default: {
      return state;
    }
  }
};
