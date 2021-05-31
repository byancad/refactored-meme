import React from "react";
import { Booking } from "../../services/booking";
import { Card, Button } from "react-bootstrap";
import { TimeSlot } from "../../utils/dateFormat";

type TimeSlotCardProps = {
  setSelectedStartTime: (startTime: Date) => void;
  setSelectedStopTime: (startTime: Date) => void;
  timeSlot: TimeSlot;
  bookings: Booking[];
  booked: boolean;
};

export const TimeSlotCard: React.FC<TimeSlotCardProps> = ({
  booked,
  bookings,
  timeSlot,
  setSelectedStartTime,
  setSelectedStopTime,
}) => {
  const buttonColor = booked ? "dark" : "light";

  return (
    <Card bg="light" text="dark" className="mb-2">
      <Button
        variant={buttonColor}
        disabled={booked}
        onClick={() => {
          setSelectedStartTime(timeSlot.actualStartTime);
          setSelectedStopTime(timeSlot.actualEndTime);
        }}
      >
        <Card.Body className="Card-body">
          <b>Time:</b> {timeSlot.displayStartTime} <br />
        </Card.Body>
      </Button>
    </Card>
  );
};
