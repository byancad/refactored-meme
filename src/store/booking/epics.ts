import { AllActions, InitialState } from "../index";
import { ActionsObservable, Epic } from "redux-observable";
import { switchMap, catchError, mergeMap, filter } from "rxjs/operators";
import {
  BookingActionTypes,
  bookingFailure,
  bookingSuccess,
  userBookingSuccess,
  roomBookingSuccess,
  userBooking,
  roomBooking,
} from "./actions";
import { isOfType } from "typesafe-actions";
import { of, from, merge } from "rxjs";
import {
  createBooking,
  deleteBooking,
  getBookingsByUser,
  getBookingsByRoom,
} from "../../services/booking";
import { addNotification } from "../notification/actions";
import {
  NotificationType,
  NotificationMessage,
} from "../notification/reducers";

export const createBookingEpic: Epic<AllActions, AllActions, InitialState> = (
  action$: ActionsObservable<AllActions>
) =>
  action$.pipe(
    filter(isOfType(BookingActionTypes.CREATE_BOOKING)),
    switchMap((action) => {
      return from(createBooking(action.payload)).pipe(
        mergeMap(() => [
          bookingSuccess(),
          addNotification({
            message: NotificationMessage.CREATE_BOOKING_SUCCESS,
            type: NotificationType.SUCCESS,
          }),
          userBooking(),
          roomBooking(
            action.payload.roomId,
            new Date(action.payload.startTime)
          ),
        ]),
        catchError((error) => merge(of(bookingFailure(error))))
      );
    })
  );

export const deleteBookingEpic: Epic<AllActions, AllActions, InitialState> = (
  action$: ActionsObservable<AllActions>
) =>
  action$.pipe(
    filter(isOfType(BookingActionTypes.DELETE_BOOKING)),
    switchMap((action) => {
      return from(deleteBooking(action.payload.bookingId)).pipe(
        mergeMap(() => [
          bookingSuccess(),
          addNotification({
            message: NotificationMessage.DELETE_BOOKING_SUCCESS,
            type: NotificationType.INFO,
          }),
          userBooking(),
        ]),
        catchError((error) => merge(of(bookingFailure(error))))
      );
    })
  );

export const userBookingEpic: Epic<AllActions, AllActions, InitialState> = (
  action$: ActionsObservable<AllActions>
) =>
  action$.pipe(
    filter(isOfType(BookingActionTypes.USER_BOOKINGS)),
    switchMap((action) => {
      return from(getBookingsByUser()).pipe(
        mergeMap((data) => [userBookingSuccess(data)]),
        catchError((error) => merge(of(bookingFailure(error))))
      );
    })
  );

export const roomBookingEpic: Epic<AllActions, AllActions, InitialState> = (
  action$: ActionsObservable<AllActions>
) =>
  action$.pipe(
    filter(isOfType(BookingActionTypes.ROOM_BOOKINGS)),
    switchMap((action) => {
      const { roomId, date } = action.payload;
      return from(getBookingsByRoom(roomId, date)).pipe(
        mergeMap((data) => [roomBookingSuccess(data)]),
        catchError((error) => merge(of(bookingFailure(error))))
      );
    })
  );

export const BookingEpics = [
  createBookingEpic,
  deleteBookingEpic,
  userBookingEpic,
  roomBookingEpic,
];
