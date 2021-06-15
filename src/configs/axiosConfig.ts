import axios from "axios";

// these should be in a config file
const BASE_URL = "http://localhost:3000/";
const TOKEN_ID = "musical-octo-spoon-token";

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.defaults.headers.common["Authorization"] = `${
  TOKEN_ID ? localStorage.getItem(TOKEN_ID) : ""
}`;

export const setTokenInLocalStorage = async (value: string) => {
  if (!TOKEN_ID || !value) return;
  await localStorage.setItem(TOKEN_ID, value);
};

export const setTokenToAxiosHeader = async () => {
  let token = await localStorage.getItem(TOKEN_ID);
  instance.defaults.headers.common["Authorization"] = `${token}`;
};

export default instance;
