import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import http from "../https/https";

interface authState {
  token: string | any;
  loading: boolean;
  isSuccess: boolean;
  isError: any;
  data: any;
}

type getMovieReq = {
  url: string;
};
const initState = {
  loading: false,
  isSuccess: false,
  isError: null,
  data: [],
} as authState;

export const getMovies = createAsyncThunk(
  "movie/get",
  async ({ url }: getMovieReq, thunkApi) => {
    const response = await http.get(url);
    return response?.data;
  }
);

const MovieSlice = createSlice({
  name: "movie",
  initialState: initState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(
      getMovies.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.data = action.payload;
        state.loading = false;
      }
    );

    builder.addCase(getMovies.pending, (state, action: PayloadAction<any>) => {
      state.data = action.payload;
      state.loading = true;
    });

    builder.addCase(getMovies.rejected, (state, action: PayloadAction<any>) => {
      state.data = action.payload;
      state.loading = true;
    });
  },
});

// export const loginRequest = createAction('auth/login_request');
// export const { login, logout } = AuthSlice.actions;

export default MovieSlice.reducer;
