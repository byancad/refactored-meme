import axiosConfig, {
  setTokenInLocalStorage,
  setTokenToAxiosHeader,
} from "../configs/axiosConfig";

export type AuthenticateDto = {
  email: string;
  password: string;
};

export type SignInResponse = {
  jwt: string;
};

export async function healthcheck(): Promise<void> {
  const response = await axiosConfig.get("");
  return response.data;
}

export async function signUp(authentiateDto: AuthenticateDto): Promise<void> {
  const response = await axiosConfig.post("/users/signup", authentiateDto);
  return response.data;
}

export async function signIn(
  authentiateDto: AuthenticateDto
): Promise<SignInResponse> {
  const response = await axiosConfig.post("/users/signin", authentiateDto);
  await setTokenInLocalStorage(response.data.jwt);
  await setTokenToAxiosHeader();
  return response.data;
}
