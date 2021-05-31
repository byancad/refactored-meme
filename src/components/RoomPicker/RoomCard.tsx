import React from "react";
import { Room } from "../../services/building";
import { Card, Button } from "react-bootstrap";

type RoomCardProps = {
  room: Room;
  setSelectedRoom: (room: Room) => void;
  fetchRoomBookings: (roomId: number, date: Date) => void;
  selectedDate: Date;
};

export const RoomCard: React.FC<RoomCardProps> = ({
  room,
  setSelectedRoom,
  fetchRoomBookings,
  selectedDate,
}) => {
  return (
    <Card bg="light" key={room.id} text="dark" className="mb-2">
      <Button
        variant="light"
        onClick={() => {
          setSelectedRoom(room);
          fetchRoomBookings(room.id, selectedDate);
        }}
      >
        <Card.Body className="Card-body">
          <b>Name:</b> {room.name} <br />
        </Card.Body>
      </Button>
    </Card>
  );
};
