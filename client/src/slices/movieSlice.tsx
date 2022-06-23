import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import http from "../https/https";

interface moveiState {
  token: string | any;
  loading: boolean;
  isSuccess: boolean;
  isError: any;
  data: any;
  movieId: any;
  selectedMovieData: any;
  isSelectedMovieLoading: boolean;
  isSselectedMovieError: boolean;
  count: number;
}

type getMovieReq = {
  url: string;
};
const initState = {
  loading: false,
  isSuccess: false,
  isError: null,
  data: null,
  movieId: null,
  selectedMovieData: null,
  isSelectedMovieLoading: false,
  isSselectedMovieError: false,
  count: 0,
} as moveiState;

export const getMovies = createAsyncThunk(
  "movie/get",
  async ({ url }: getMovieReq, thunkApi) => {
    const response = await http.get(url);
    return response?.data;
  }
);

export const getMovieById = createAsyncThunk(
  "movie/getById",
  async ({ url }: getMovieReq, thunkApi) => {
    const response = await http.get(url);
    return response?.data;
  }
);

const MovieSlice = createSlice({
  name: "movie",
  initialState: initState,
  reducers: {
    setMovieId(state: { movieId: any }, { payload }: PayloadAction<any>) {
      state.movieId = payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      getMovies.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.data = action.payload?.data;
        state.count = action.payload?.count;
        state.movieId = action.payload?.data?.[0]?.id;
        state.loading = false;
      }
    );

    builder.addCase(getMovies.pending, (state, action: PayloadAction<any>) => {
      state.loading = true;
    });

    builder.addCase(getMovies.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
    });
    builder.addCase(
      getMovieById.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.selectedMovieData = action.payload;
        state.isSelectedMovieLoading = false;
      }
    );

    builder.addCase(
      getMovieById.pending,
      (state, action: PayloadAction<any>) => {
        state.isSelectedMovieLoading = true;
      }
    );

    builder.addCase(
      getMovieById.rejected,
      (state, action: PayloadAction<any>) => {
        state.isSelectedMovieLoading = false;
      }
    );
  },
});

export const { setMovieId } = MovieSlice.actions;

export default MovieSlice.reducer;
