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
  //   const state = store.getState();

  //   if (state?.Auth?.token) {
  //     const token = `jwt ${state.Auth.token}`;
  //     config.headers.Authorization = token;
  //   }

  return config;
});

export default http;
