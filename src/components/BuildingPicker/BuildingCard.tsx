import React from "react";
import { Card, Button } from "react-bootstrap";
import { Building } from "../../services/user";

type BuildingCardProps = {
  building: Building;
  setSelectedBuilding: (building: Building) => void;
  fetchBuildingDetails: (buildingId: number) => void;
};

export const BuildingCard: React.FC<BuildingCardProps> = ({
  building,
  setSelectedBuilding,
  fetchBuildingDetails,
}) => {
  return (
    <Card bg="light" key={building.id} text="dark" className="mb-2">
      <Button
        variant="light"
        onClick={() => {
          setSelectedBuilding(building);
          fetchBuildingDetails(building.id);
        }}
      >
        <Card.Body className="Card-body">
          <b>Name:</b> {building.name} <br />
        </Card.Body>
      </Button>
    </Card>
  );
};
