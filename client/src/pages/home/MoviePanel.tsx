import React, { useState } from "react";
import style from "./Home.module.css";
import tabStyle from "../../components/Tabs/Tabs.module.css";
import FavoriteListContainer from "./Movies/FavoriteListContainer";
import MovieListContainer from "./Movies/MovieListContainer";
import Pagination from "../../components/Pagination/Pagination";
import usePagination from "./../../hooks/usePagination";
type Props = {};

const MoviePanel = (props: Props) => {
  const [activePanel, setActivePanel] = useState(0);

  return (
    <div className={style.moviePanel}>
      <div className={tabStyle.tabs}>
        <div
          className={
            !activePanel
              ? `${tabStyle.tabItem} ${tabStyle.active}`
              : `${tabStyle.tabItem}`
          }
          onClick={() => setActivePanel(0)}
        >
          <h2>Movies</h2>
        </div>
        <div
          className={
            activePanel
              ? `${tabStyle.tabItem} ${tabStyle.active}`
              : `${tabStyle.tabItem}`
          }
          onClick={() => setActivePanel(1)}
        >
          <h2>Favorite</h2>
        </div>
      </div>
      {activePanel ? <FavoriteListContainer /> : <MovieListContainer />}
     
    </div>
  );
};

export default MoviePanel;
