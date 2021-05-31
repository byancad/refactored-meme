import axiosConfig from "../configs/axiosConfig";

export type Hour = {
  id: number;
  dayOfWeek: number;
  openTime: Date;
  closeTime: Date;
};

export type Room = {
  id: number;
  name: string;
  buildingId: number;
  primaryRoleId: number;
};

export type Event = {
  id: number;
  name: string;
  buildingId: number;
  primaryRoleId: number;
  guestRoleId: number;
  eventDate: Date;
};

export type BuildingDetailsDto = {
  rooms: Room[];
  events: Event[];
  hours: Hour[];
};

export async function getBuildingDetails(
  buildingId: number
): Promise<BuildingDetailsDto> {
  const response = await axiosConfig.get(`/buildings/${buildingId}`);
  return response.data;
}
