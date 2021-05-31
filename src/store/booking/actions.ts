import { Action } from "redux";
import { CreateBookingDto, Booking } from "../../services/booking";

export enum BookingActionTypes {
  CREATE_BOOKING = "@@booking/CREATE_BOOKING",
  DELETE_BOOKING = "@@booking/DELETE_BOOKING",
  USER_BOOKINGS = "@@booking/USER_BOOKINGS",
  USER_BOOKINGS_SUCCESS = "@@booking/USER_BOOKINGS_SUCCESS",
  ROOM_BOOKINGS = "@@booking/ROOM_BOOKINGS",
  ROOM_BOOKINGS_SUCCESS = "@@booking/ROOM_BOOKINGS_SUCCESS",
  BOOKING_SUCCESS = "@@booking/BOOKING_SUCCESS",
  BOOKING_FAILURE = "@@booking/BOOKING_FAILURE",
}

interface CreateBooking extends Action {
  type: BookingActionTypes.CREATE_BOOKING;
  payload: CreateBookingDto;
}

interface DeleteBooking extends Action {
  type: BookingActionTypes.DELETE_BOOKING;
  payload: {
    bookingId: number;
  };
}

interface UserBookings extends Action {
  type: BookingActionTypes.USER_BOOKINGS;
}

interface RoomBookings extends Action {
  type: BookingActionTypes.ROOM_BOOKINGS;
  payload: {
    roomId: number;
    date: Date;
  };
}

interface BookingFailure extends Action {
  type: BookingActionTypes.BOOKING_FAILURE;
  payload: {
    error: Error;
  };
}

interface BookingSuccess extends Action {
  type: BookingActionTypes.BOOKING_SUCCESS;
}

interface UserBookingsSuccess extends Action {
  type: BookingActionTypes.USER_BOOKINGS_SUCCESS;
  payload: Booking[];
}

interface RoomBookingsSuccess extends Action {
  type: BookingActionTypes.ROOM_BOOKINGS_SUCCESS;
  payload: Booking[];
}

export const createBooking = (
  createBookingDto: CreateBookingDto
): CreateBooking => {
  return {
    type: BookingActionTypes.CREATE_BOOKING,
    payload: createBookingDto,
  };
};

export const deleteBooking = (bookingId: number): DeleteBooking => {
  return {
    type: BookingActionTypes.DELETE_BOOKING,
    payload: { bookingId },
  };
};

export const userBooking = (): UserBookings => {
  return {
    type: BookingActionTypes.USER_BOOKINGS,
  };
};

export const roomBooking = (roomId: number, date: Date): RoomBookings => {
  return {
    type: BookingActionTypes.ROOM_BOOKINGS,
    payload: { roomId, date },
  };
};

export const bookingFailure = (error: Error): BookingFailure => {
  return {
    type: BookingActionTypes.BOOKING_FAILURE,
    payload: { error },
  };
};

export const bookingSuccess = (): BookingSuccess => {
  return {
    type: BookingActionTypes.BOOKING_SUCCESS,
  };
};

export const userBookingSuccess = (
  bookings: Booking[]
): UserBookingsSuccess => {
  return {
    type: BookingActionTypes.USER_BOOKINGS_SUCCESS,
    payload: bookings,
  };
};

export const roomBookingSuccess = (
  bookings: Booking[]
): RoomBookingsSuccess => {
  return {
    type: BookingActionTypes.ROOM_BOOKINGS_SUCCESS,
    payload: bookings,
  };
};

export type BookingActions =
  | CreateBooking
  | DeleteBooking
  | UserBookings
  | RoomBookings
  | BookingFailure
  | BookingSuccess
  | UserBookingsSuccess
  | RoomBookingsSuccess;
