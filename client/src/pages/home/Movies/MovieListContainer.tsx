import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store";
import Card from "../../../components/MovieCard/Card";
import { getMovies, setMovieId } from "../../../slices/movieSlice";
import style from "./Movies.module.css";

type Props = {};

const MovieListContainer = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: any) => state.movie);
  //   console.log(movieState);

  useEffect(() => {
    dispatch(getMovies({ url: "/movies" }));
  }, []);

  const selectedMovieIdHandler = (id: string) => {
    return () => {
      dispatch(setMovieId(id));
    };
  };
  console.log(data);
  return (
    <div className={style.movieListContainer}>
      {data?.map((movie: any) => {
        return (
          <Card
            key={movie?.id}
            image={movie?.imageUrl}
            description={movie?.description}
            name={movie?.name}
            onClick={selectedMovieIdHandler(movie?.id)}
          />
        );
      })}
    </div>
  );
};

export default MovieListContainer;
