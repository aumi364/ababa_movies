import axios from "axios";
// import { store } from "store";

export const baseUrl = process.env.REACT_APP_BACKEND_URL;

const http = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  baseURL: baseUrl,
});

http.interceptors.request.use((config: any) => {
  const token = localStorage.getItem("token");

  if (token) {
    const bearerToken = `Bearer ${token}`;
    config.headers.Authorization = bearerToken;
  }

  return config;
});
http.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error.response);
    if (error.response.data.statusCode === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
export default http;
