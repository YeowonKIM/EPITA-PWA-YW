
import React, { useEffect, useState } from "react";
import "../styles/Row.css";
import movieTrailer from "movie-trailer";
import { useNavigate } from "react-router-dom";
import YouTube from "react-youtube";

import SkeletonMovieRow from "./SkeletonMovieRow";

const opts = {
  height: "400",
  width: "100%",
  playerVars: {
    autoplay: 1,
  },
};

const Row = ({ movies, title, isLarge }) => {
  const [movie, setMovie] = useState({});
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // movies prop이 바뀌면 로딩 다시 시작
    setIsLoading(true);
    if (movies && movies.length > 0) {
      setTimeout(() => setIsLoading(false), 1000);
      setIsLoading(false);
    }
  }, [movies]);

  const handlePlayClick = (event) => {
    event.preventDefault();
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  const handleViewClick = (event) => {
    event.preventDefault();
    navigate(`/movie/${movie.movie_id}`, { state: { movie } });
  };

  const handleMovieClick = (event, movie) => {
    event.preventDefault();
    setMovie(movie);
    if (trailerUrl) {
      setTrailerUrl("");
    }
    setShowModal(!showModal);
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {isLoading ? (
          <SkeletonMovieRow isLarge={isLarge} /> 
        ) : movies?.length === 0 ? (
          <span>No Movies Found</span>
        ) : (
          movies.map((movie) => (
            <img
              key={movie.movie_id}
              className={`row_poster ${isLarge && "row_posterLarge"}`}
              src={isLarge ? movie.poster : movie.backdrop_poster}
              alt={movie.title}
              onClick={(event) => handleMovieClick(event, movie)}
            />
          ))
        )}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      {showModal && (
        <div className="movie_options">
          <button className="movie_button" onClick={handlePlayClick}>
            Play
          </button>
          <button className="movie_button" onClick={handleViewClick}>
            View
          </button>
        </div>
      )}
    </div>
  );
};

export default Row;
