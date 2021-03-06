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
): Promise<void> {
  await axiosConfig.post("/token/access-token", tokenData);
  return;
}

export async function getAccounts() {
  const response = await axiosConfig.get("/token/accounts");
  return response.data;
}

export async function getTransactions() {
  const response = await axiosConfig.get("/token/transactions");
  return response.data;
}
