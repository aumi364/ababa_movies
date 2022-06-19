import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import http from "../https/https";

interface authState {
  token: string | any;
  loading: boolean;
  isSuccess: boolean;
}

type LoginReq = {
  formData: any;
  url: string;
};
const initState = {
  token: null,
  loading: false,
  isSuccess: false,
} as authState;

export const loginReq = createAsyncThunk(
  "auth/loginReq",
  async ({ formData, url }: LoginReq, thunkApi) => {
    const response = await http.post(url, formData);
    return response?.data;
  }
);

const AuthSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    login(state: { token: any }, { payload }: PayloadAction<any>) {
      state.token = payload;
    },
    logout() {
      localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loginReq.fulfilled, (state, action: PayloadAction<any>) => {
      state.token = action.payload?.access_token;
      localStorage.setItem("token", state.token);
      state.loading = false;
      state.isSuccess = true;
    });

    builder.addCase(loginReq.pending, (state, action: PayloadAction<any>) => {
      state.loading = true;
      state.isSuccess = false;
      localStorage.removeItem("token");
    });

    builder.addCase(loginReq.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.isSuccess = false;
      localStorage.removeItem("token");
    });
  },
});

// export const loginRequest = createAction('auth/login_request');
export const { login, logout } = AuthSlice.actions;

export default AuthSlice.reducer;
