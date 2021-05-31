import React from "react";
import { BuildingCard } from "./BuildingCard";
import { Building } from "../../services/user";

type BuildingPickerProps = {
  buildings: Building[] | undefined;
  selectedBuilding: Building | undefined;
  setSelectedBuilding: (building: Building) => void;
  fetchBuildingDetails: (buildingId: number) => void;
};

export const BuildingPicker: React.FC<BuildingPickerProps> = ({
  buildings,
  selectedBuilding,
  setSelectedBuilding,
  fetchBuildingDetails,
}) => {
  const headerLabel = selectedBuilding
    ? `Building: ${selectedBuilding.name}`
    : "Choose Building";
  const labelColor = selectedBuilding ? "green" : "";

  return (
    <div>
      <div className={`Picker-header color-${labelColor}`}>
        <h3>{headerLabel}</h3>
      </div>

      {!selectedBuilding && buildings && (
        <div>
          {buildings.map((building, id) => {
            return (
              <BuildingCard
                key={id}
                building={building}
                setSelectedBuilding={setSelectedBuilding}
                fetchBuildingDetails={fetchBuildingDetails}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
