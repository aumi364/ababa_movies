import React from "react";
import style from "./Home.module.css";
import MoviePanel from "./MoviePanel";
import SelectedMovieViewPanel from "./SelectedMovieViewPanel";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className={style.homeContainer}>
      <MoviePanel />
      <SelectedMovieViewPanel />
    </div>
  );
};

export default Home;
