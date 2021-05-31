import axios from "axios";

// these should be in a config file
const BASE_URL = "http://ec2-3-17-36-231.us-east-2.compute.amazonaws.com";
const TOKEN_ID = "musical-octo-spoon-token";

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.defaults.headers.common["Authorization"] = `Bearer ${
  TOKEN_ID ? localStorage.getItem(TOKEN_ID) : ""
}`;

export const setTokenInLocalStorage = async (value: string) => {
  if (!TOKEN_ID || !value) return;
  await localStorage.setItem(TOKEN_ID, value);
};

export const setTokenToAxiosHeader = async () => {
  let token = await localStorage.getItem(TOKEN_ID);
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default instance;
