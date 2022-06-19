import axios from "axios";
// import { store } from "store";

const http = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((config: any) => {
  //   const state = store.getState();

  //   if (state?.Auth?.token) {
  //     const token = `jwt ${state.Auth.token}`;
  //     config.headers.Authorization = token;
  //   }

  return config;
});

// http.interceptors.response.use(null, error => {
//   if (error?.response?.message) {
//     message.error(error.response.message);
//     return { error };
//   }
//
//   message.error('Something went wrong!');
//
//   return { error };
// });

export default http;
