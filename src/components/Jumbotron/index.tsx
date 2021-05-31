import React from "react";
import { Jumbotron, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export enum JumboTronLabel {
  BOOKINGS = "My Bookings",
  SCHEDULE = "Schedule Bookings",
}

enum JumboTronSubtext {
  BOOKINGS = "Here is where you can view and cancel conference rooms that you have booked",
  SCHEDULE = "Follow the steps to book a meeting space for you and your team",
}

type JumboTronProps = {
  label: JumboTronLabel;
};

export const JumboTron: React.FC<JumboTronProps> = ({ label }) => {
  const subText =
    label === JumboTronLabel.BOOKINGS
      ? JumboTronSubtext.BOOKINGS
      : JumboTronSubtext.SCHEDULE;

  return (
    <Jumbotron fluid className="jumbo-tron">
      <h1>{label}</h1>
      <p>{subText}</p>
      <p>
        {label === "My Bookings" ? (
          <LinkContainer to="/schedule-bookings">
            <Button variant="primary">Reserve a room</Button>
          </LinkContainer>
        ) : (
          <LinkContainer to="/my-bookings">
            <Button variant="primary">View Reservations</Button>
          </LinkContainer>
        )}
      </p>
    </Jumbotron>
  );
};
