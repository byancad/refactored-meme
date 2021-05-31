import React from "react";
import { Button } from "react-bootstrap";
import { TimeSlotCard } from "./TimeSlotCard";
import { Room, Hour, Event } from "../../services/building";
import {
  areTheSameDay,
  getTimeSlots,
  getHourFromNum,
  formatDateTime,
} from "../../utils/dateFormat";
import { Booking } from "../../services/booking";

type TimeSlotPickerProps = {
  selectedRoom: Room;
  hours: Hour[];
  events: Event[];
  setSelectedStartTime: (date: Date) => void;
  setSelectedStopTime: (date: Date) => void;
  resetForm: () => void;
  saveBooking: () => void;
  selectedStopTime: Date | undefined;
  selectedDate: Date;
  selectedStartTime: Date | undefined;
  bookings: Booking[];
  isSlotBooked: (start: string, stop: string) => boolean;
};

export const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  bookings,
  selectedRoom,
  hours,
  setSelectedStartTime,
  setSelectedStopTime,
  events,
  selectedDate,
  selectedStartTime,
  resetForm,
  saveBooking,
  selectedStopTime,
  isSlotBooked,
}) => {
  const headerLabel = selectedStartTime
    ? `Time Slot: ${getHourFromNum(selectedStartTime.getHours())}`
    : "Choose Time Slot";
  const labelColor = selectedStartTime ? "Green" : "";
  let allowedRoles: number[] = events
    .filter((e) => {
      return areTheSameDay(e.eventDate, selectedDate);
    })
    .map((event) => event.guestRoleId);
  allowedRoles.push(selectedRoom.primaryRoleId);

  let dayOfWeek = hours.find(
    (hour) => hour.dayOfWeek === selectedDate.getDay()
  );
  let timeSlots;
  if (dayOfWeek && dayOfWeek.openTime && dayOfWeek.closeTime) {
    timeSlots = getTimeSlots(
      selectedDate,
      dayOfWeek.openTime.toString(),
      dayOfWeek.closeTime.toString()
    );
  }

  return (
    <div>
      <div className={`Picker-header color-${labelColor}`}>
        <h3>{headerLabel}</h3>
      </div>

      {selectedRoom && selectedStartTime && selectedStopTime && (
        <div className="mrg-btm">
          <Button
            variant="light"
            className="mrg-right"
            onClick={() => resetForm()}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={() => saveBooking()}>
            Save
          </Button>
        </div>
      )}

      {(dayOfWeek?.openTime === null || dayOfWeek?.closeTime == null) && (
        <div className="alert">
          Office Building closed on this day, try a different date
        </div>
      )}

      {timeSlots && (
        <div>
          {timeSlots.map((timeSlot, id) => {
            const formattedStart = formatDateTime(timeSlot.actualStartTime);
            const formattedStop = formatDateTime(timeSlot.actualEndTime);
            const booked = isSlotBooked(formattedStart, formattedStop);

            return (
              <TimeSlotCard
                key={id}
                booked={booked}
                bookings={bookings}
                timeSlot={timeSlot}
                setSelectedStartTime={setSelectedStartTime}
                setSelectedStopTime={setSelectedStopTime}
              />
            );
          })}
        </div>
      )}

      {timeSlots && timeSlots.length === 0 && (
        <div className="alert">
          Sorry! No more bookings left for this date :({" "}
        </div>
      )}
    </div>
  );
};
