import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store";
import Card from "../../../components/MovieCard/Card";
import { getMovies, setMovieId } from "../../../slices/movieSlice";
import configUrl from "./../../../helpers/config";
import style from "../Home.module.css";
import Search from "../../../components/FormElements/Search";
import usePagination from "../../../hooks/usePagination";
import Pagination from "../../../components/Pagination/Pagination";

type Props = {};

const MovieListContainer = (props: Props) => {
  type Form = {
    name: string;
  };
  const { pageLimit, offset, handlePageChange } = usePagination();
  const dispatch = useDispatch<AppDispatch>();
  const { data, count, loading } = useSelector((state: any) => state.movie);
  const [name, setName] = useState("");
  //console.log(movieState);
  const movieUrl = configUrl({
    endpoint: "/movies",
    query: {
      limit: pageLimit,
      offset: offset,
      name: name,
    },
  });

  useEffect(() => {
    dispatch(getMovies({ url: movieUrl }));
  }, [name, offset]);

  const selectedMovieIdHandler = (id: string) => {
    return () => {
      dispatch(setMovieId(id));
    };
  };

  const onSubmit: SubmitHandler<Form> = (data: any) => setName(data.name);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();
  return (
    <div className={style.moviesContainer}>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Search
            register={register}
            name="name"
            type="name"
            placeholder="Name of the movie"
          />
        </form>
      </div>
      <Pagination {...{ offset, count, pageLimit, handlePageChange }} />
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
    </div>
  );
};

export default MovieListContainer;
