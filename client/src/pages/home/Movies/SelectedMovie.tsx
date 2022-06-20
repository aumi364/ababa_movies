import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { getMovieById } from "../../../slices/movieSlice";
import style from "../Home.module.css";
import NoData from "../../../assets/noData.svg";
type Props = {};

const SelectedMovie = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { movieId, selectedMovieData } = useSelector(
    (state: any) => state.movie
  );

  useEffect(() => {
    dispatch(getMovieById({ url: `/movies/${movieId}` }));
  }, [movieId]);

  return (
    <div>
      {!selectedMovieData && (
        <div className={style.noDataImage}>
          <img src={NoData} alt="logo" />
          {/* <h4>No movie selected</h4> */}
        </div>
      )}
    </div>
  );
};

export default SelectedMovie;
