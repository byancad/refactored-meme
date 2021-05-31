import axiosConfig from "../configs/axiosConfig";

export type Role = {
  id: number;
  name: string;
  roles: Role[];
};

export type User = {
  id: string;
  employerId: number;
  email: string;
  roles: Role[];
};

export type Building = {
  id: number;
  name: string;
};

export type UserDetailsDto = {
  user: User;
  buildings: Building[];
};

export async function getUserDetails(): Promise<UserDetailsDto> {
  const response = await axiosConfig.get("/users");
  return response.data;
}
