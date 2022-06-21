import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import http from "../https/https";

interface moveiState {
  token: string | any;
  loading: boolean;
  isSuccess: boolean;
  isError: any;
  data: any;
  addTofavoriteLoading: boolean;
  
}

type getMovieReq = {
  url: string;
  formData?: any;
};
const initState = {
  loading: false,
  isSuccess: false,
  isError: null,
  data: null,
  addTofavoriteLoading: false,

} as moveiState;

export const getFavoriteMovies = createAsyncThunk(
  "favorite/get",
  async ({ url }: getMovieReq, thunkApi) => {
    const response = await http.get(url);
    return response?.data;
  }
);

export const addToFavorite = createAsyncThunk(
  "favorite/add",
  async ({ url, formData }: getMovieReq, { dispatch }) => {
    const response = await http.post(url, formData);
    await dispatch(getFavoriteMovies({ url: "/favorites" }));
    return response?.data;
  }
);

const FavoriteSlice = createSlice({
  name: "movie",
  initialState: initState,
  reducers: {
 
  },

  extraReducers: (builder) => {
    builder.addCase(
      getFavoriteMovies.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.data = action.payload;
        state.loading = false;
      }
    );

    builder.addCase(
      getFavoriteMovies.pending,
      (state, action: PayloadAction<any>) => {
        state.data = action.payload;
        state.loading = true;
      }
    );

    builder.addCase(
      getFavoriteMovies.rejected,
      (state, action: PayloadAction<any>) => {
        state.data = action.payload;
        state.loading = false;
      }
    );

    builder.addCase(addToFavorite.fulfilled, (state) => {
      state.addTofavoriteLoading = false;
    });

    builder.addCase(
      addToFavorite.pending,
      (state, action: PayloadAction<any>) => {
        state.addTofavoriteLoading = true;
      }
    );

    builder.addCase(
      addToFavorite.rejected,
      (state, action: PayloadAction<any>) => {
        state.addTofavoriteLoading = false;
      }
    );
  },
});



export default FavoriteSlice.reducer;
