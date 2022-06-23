import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store";
import NoData from "../../../assets/noData.svg";
import { addToFavorite } from "../../../slices/favoriteSlice";
import { getMovieById } from "../../../slices/movieSlice";
import { FvrtIcon } from "./../../../components/Icon/FvrtIcon";
import style from "../Home.module.css";
import { toast } from "react-hot-toast";
type Props = {};

const SelectedMovie = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { movieId, selectedMovieData }: any = useSelector(
    (state: any) => state.movie
  );
  const [isFavorite, setIsFavorite] = useState(false);
  const { filters }: any = selectedMovieData || {};
  useEffect(() => {
    dispatch(getMovieById({ url: `/movies/${movieId}` }));
  }, [movieId]);

  console.log(selectedMovieData);
  const addTofavoriteHandler = (id: any) => {
    return () => {
      dispatch(addToFavorite({ url: `/favorites/`, formData: { movieId } }));
      isFavorite
        ? toast.success("Removed from favorite")
        : toast.success("Added to favorite");
      setIsFavorite(!isFavorite);
    };
  };

  useEffect(() => {
    setIsFavorite(selectedMovieData?.favorite ? true : false);
  }, [selectedMovieData]);
  return (
    <div className={style.selectedMovieContainer}>
      {!selectedMovieData ? (
        <div className={style.noDataImage}>
          <img src={NoData} alt="logo" />
          {/* <h4>No movie selected</h4> */}
        </div>
      ) : (
        <div className={style.movieDetails}>
          <div className={style.fvrtSection}>
            <p>Add to favorite</p>
            <div
              className={style.fvrtButton}
              onClick={addTofavoriteHandler(selectedMovieData?.id)}
            >
              <FvrtIcon color={isFavorite ? "#fe2ebb" : "grey"} />
            </div>
          </div>
          <div className={style.moviePoster}>
            <img src={selectedMovieData?.imageUrl} alt="poster" />
          </div>
          <div className={style.movieBody}>
            <div className={style.movieCategories}>
              <div className={style.genres}>
                <p>Genre - {filters?.genre?.join(", ")}</p>
              </div>
              <div className={style.genres}>
                <p>Year - {filters?.year?.[0]}</p>
              </div>
            </div>
            <div className={style.movieDescription}>
              {selectedMovieData?.description}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedMovie;
