import React from "react";
import style from "./Home.module.css";
import MoviePanel from "./MoviePanel";
import SelectedMovieViewPanel from "./SelectedMovieViewPanel";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { logout } from "../../slices/authSlice";

type Props = {};

const Home = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const logoutHandler = () => {
    dispatch(logout());
    window.location.href = "/";
  };
  return (
    <div className={style.homeContainer}>
      <div className={style.logout} onClick={logoutHandler}>
        <p>Logout</p>
      </div>

      <MoviePanel />
      <SelectedMovieViewPanel />
    </div>
  );
};

export default Home;
