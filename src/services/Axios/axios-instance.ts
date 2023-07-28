import axios from "axios";

export type JwtToken = {
  email: string;
  iat: number;
  exp: number;
};

export type HttpError = null | string | Array<{ [key: string]: string }>;

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
});

instance.interceptors.request.use((config) => {
  const userToken = localStorage.getItem("userToken");

  if (userToken) {
    config.headers["Authorization"] = `Bearer ${userToken}`;
  }

  return config;
});

export default instance;
