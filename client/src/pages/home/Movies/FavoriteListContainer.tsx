import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store";
import Card from "../../../components/MovieCard/Card";
import { getMovies, setMovieId } from "../../../slices/movieSlice";
import { getFavoriteMovies } from "./../../../slices/favoriteSlice";
import style from "../Home.module.css";

type Props = {
  favorite: any;
};

const FavoriteListContainer = ({ favorite }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, toggle } = favorite;
  //   console.log(movieState);

  useEffect(() => {
    dispatch(getFavoriteMovies({ url: "/favorites" }));
  }, [toggle]);

  const selectedMovieIdHandler = (id: string) => {
    return () => {
      dispatch(setMovieId(id));
    };
  };

  return (
    <div className={style.movieListContainer}>
      {data?.favorites.map((favorite: any) => {
        return (
          <Card
            key={favorite?.movie?.id}
            image={favorite?.movie?.imageUrl}
            description={favorite?.movie?.description}
            name={favorite?.movie?.name}
            onClick={selectedMovieIdHandler(favorite?.movie?.id)}
          />
        );
      })}
    </div>
  );
};

export default connect((state: any) => ({ favorite: state.favorite }))(
  FavoriteListContainer
);
