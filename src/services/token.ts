import axiosConfig from "../configs/axiosConfig";

export type LinkTokenResponseDto = {
  expiration: string;
  link_token: string;
  request_id: string;
  status_code: number;
};

export type AccessTokenRequestDto = {
  publicToken: string;
};

export type AccessTokenResponseDto = {
  access_token: string;
  item_id: string;
  request_id: string;
  status_code: number;
};

export async function postLinkToken(): Promise<LinkTokenResponseDto> {
  const response = await axiosConfig.post("/token/link-token");
  return response.data;
}

export async function postAccessToken(
  tokenData: AccessTokenRequestDto
): Promise<AccessTokenResponseDto> {
  const response = await axiosConfig.post("/token/access-token", tokenData);
  return response.data;
}
