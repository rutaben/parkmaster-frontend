import axios from "axios";

// Sets up a custom Axios HTTP client with some default configuration options for making API requests

// Creates axios instance with specific configs
const instance = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Allow us to intercept and modify the request configuration before it is sent (adds authorization header)
instance.interceptors.request.use((config) => {
  const userToken = localStorage.getItem("userToken");

  if (userToken) {
    config.headers["Authorization"] = `Bearer ${userToken}`;
  }

  return config;
});

export default instance;
