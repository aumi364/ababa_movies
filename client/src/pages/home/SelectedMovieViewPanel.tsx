import React from "react";
import style from "./Home.module.css";

import SelectedMovie from "./Movies/SelectedMovie";

const SelectedMovieViewPanel = ({ movie }: any) => {
  return (
    <div className={style.selectedMoviePanel}>
      <SelectedMovie />
    </div>
  );
};

export default SelectedMovieViewPanel;
