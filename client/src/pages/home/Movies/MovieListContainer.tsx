import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { getMovies } from "../../../slices/movieSlice";

type Props = {};

const MovieListContainer = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: any) => state.movie);
  //   console.log(movieState);

  useEffect(() => {
    dispatch(getMovies({ url: "/movies" }));
  }, []);

  return <div>MovieListContainer</div>;
};

export default MovieListContainer;
