import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { JumboTron, JumboTronLabel } from "../components/Jumbotron";
import { Container } from "react-bootstrap";
import { Building } from "../services/user";
import { BuildingPicker } from "../components/BuildingPicker";
import { DateSelector } from "../components/DatePicker";
import {
  dateNotInThePast,
  areTheSameDay,
  formatDateTime,
} from "../utils/dateFormat";
import "react-datepicker/dist/react-datepicker.css";
import { createBooking } from "../store/booking/actions";
import {
  useBookingState,
  useBuildingState,
  useUserState,
} from "../store/hooks";
import { buildingDetails } from "../store/building/actions";
import { RoomPicker } from "../components/RoomPicker";
import { Room } from "../services/building";
import { roomBooking } from "../store/booking/actions";
import { TimeSlotPicker } from "../components/TimeSlotPicker";
import "../styles/ScheduleBookings.css";

type ScheduleBookingsProps = {};

export const ScheduleBookings: React.FC<ScheduleBookingsProps> = () => {
  const user = useUserState();
  const building = useBuildingState();
  const bookings = useBookingState();
  const dispatch = useDispatch();
  const fetchBuildingDetails = (buildingId: number) =>
    dispatch(buildingDetails(buildingId));
  const fetchRoomBookings = (roomId: number, date: Date) =>
    dispatch(roomBooking(roomId, date));

  const timeNow = new Date();
  const [selectedBuilding, setSelectedBuilding] = useState<Building>();
  const [selectedDate, setSelectedDate] = useState<Date>(timeNow);
  const [selectedRoom, setSelectedRoom] = useState<Room>();
  const [selectedStartTime, setSelectedStartTime] = useState<Date>();
  const [selectedStopTime, setSelectedStopTime] = useState<Date>();
  const details =
    selectedBuilding &&
    building &&
    building.details &&
    building.details[selectedBuilding.id];
  const roomBookings =
    selectedRoom &&
    bookings &&
    bookings.roomBookings &&
    bookings.roomBookings[selectedRoom.id];
  const roomBookingsByDay =
    roomBookings?.filter((b) => areTheSameDay(b.startTime, selectedDate)) || [];
  const userRoles = user && user.details && user.details.roles;
  const userRoleIds = userRoles?.map((r) => r.id) || [];

  const isSlotBooked = (start: string, stop: string) => {
    let isSlotBooked = false;
    if (roomBookingsByDay) {
      let overlap = roomBookingsByDay.find(
        (b) =>
          formatDateTime(new Date(b.startTime)) === start &&
          formatDateTime(new Date(b.stopTime)) === stop
      );
      if (overlap) {
        isSlotBooked = true;
      }
    }

    return isSlotBooked;
  };

  const ensureDateAndSetSelected = (arg: Date | [Date, Date] | null) => {
    if (arg instanceof Date && dateNotInThePast(arg, timeNow)) {
      setSelectedDate(arg);
    }
  };

  const resetForm = () => {
    setSelectedBuilding(undefined);
    setSelectedRoom(undefined);
    setSelectedDate(new Date());
    setSelectedStartTime(undefined);
    setSelectedStopTime(undefined);
  };

  const saveBooking = () => {
    if (selectedRoom && selectedStartTime && selectedStopTime) {
      dispatch(
        createBooking({
          roomId: selectedRoom.id,
          startTime: selectedStartTime,
          stopTime: selectedStopTime,
        })
      );
      setSelectedStartTime(undefined);
      setSelectedStopTime(undefined);
    }
  };

  return (
    <div>
      <JumboTron label={JumboTronLabel.SCHEDULE} />
      <Container>
        <DateSelector
          selectedDate={selectedDate}
          ensureDateAndSetSelected={ensureDateAndSetSelected}
        />

        <BuildingPicker
          buildings={user.buildings}
          selectedBuilding={selectedBuilding}
          setSelectedBuilding={setSelectedBuilding}
          fetchBuildingDetails={fetchBuildingDetails}
        />

        {selectedBuilding && details && (
          <RoomPicker
            rooms={details.rooms}
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
            selectedDate={selectedDate}
            fetchRoomBookings={fetchRoomBookings}
            userRoleIds={userRoleIds}
            events={details.events}
          />
        )}

        {selectedRoom && details && (
          <TimeSlotPicker
            bookings={roomBookingsByDay}
            selectedRoom={selectedRoom}
            hours={details.hours}
            events={details.events}
            setSelectedStartTime={setSelectedStartTime}
            selectedDate={selectedDate}
            selectedStartTime={selectedStartTime}
            setSelectedStopTime={setSelectedStopTime}
            resetForm={resetForm}
            saveBooking={saveBooking}
            selectedStopTime={selectedStopTime}
            isSlotBooked={isSlotBooked}
          />
        )}
      </Container>
    </div>
  );
};
