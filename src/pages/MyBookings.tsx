import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import { BookingCard } from "../components/BookingCard";
import { JumboTron, JumboTronLabel } from "../components/Jumbotron";
import { useBookingState, useUserState } from "../store/hooks";
import { userBooking, deleteBooking } from "../store/booking/actions";
import "../styles/MyBookings.css";

type MyBookingsProps = {};

export const MyBookings: React.FC<MyBookingsProps> = () => {
  const timeNow = new Date();
  const dispatch = useDispatch();
  const bookings = useBookingState();
  const user = useUserState();
  const buildings = user.buildings || [];

  useEffect(() => {
    dispatch(userBooking());
  }, [dispatch]);

  const sendDeleteBooking = (id: number) => dispatch(deleteBooking(id));

  return (
    <div>
      <JumboTron label={JumboTronLabel.BOOKINGS} />

      <Container>
        {bookings && bookings.userBookings.length == 0 && (
          <div className="info-text">
            You have no schedule bookings. Click Reserve a room to book a space.
          </div>
        )}
        {bookings.userBookings.map((booking, id) => {
          return new Date(booking.stopTime) < new Date(timeNow) ? (
            <div />
          ) : (
            <BookingCard
              key={id}
              buildings={buildings}
              timeNow={timeNow}
              booking={booking}
              sendDeleteBooking={sendDeleteBooking}
            />
          );
        })}
      </Container>
    </div>
  );
};
