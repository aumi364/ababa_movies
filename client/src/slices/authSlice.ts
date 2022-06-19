import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface authState {
  token: string | any;
  loading: boolean;
}

type loginReq = {};
const initState = {
  token: null,
  loading: false,
} as authState;

export const loginReq = createAsyncThunk(
  "auth/loginReq",
  //   async ({ formData, url }, thunkApi) => {
  //     const response = await http.post(url, formData);
  //     return response?.data;
  //   }
  () => {}
);

const AuthSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    login(state: { token: any }, { payload }: PayloadAction<any>) {
      state.token = payload;
    },
    logout() {
      //   storage.removeItem("persist:root");
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loginReq.fulfilled, (state, action: PayloadAction<any>) => {
      state.token = action.payload?.token;
      state.loading = false;
    });

    builder.addCase(loginReq.pending, (state, action: PayloadAction<any>) => {
      state.loading = true;
    });

    builder.addCase(loginReq.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
    });
  },
});

// export const loginRequest = createAction('auth/login_request');
export const { login, logout } = AuthSlice.actions;

export default AuthSlice.reducer;
