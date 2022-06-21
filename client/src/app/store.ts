import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import favoriteSlice from "../slices/favoriteSlice";
import movieSlice from "../slices/movieSlice";
import authSlice from "./../slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    movie: movieSlice,
    favorite: favoriteSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
