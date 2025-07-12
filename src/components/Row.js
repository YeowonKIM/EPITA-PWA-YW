import React, { useState } from "react";
import "../styles/Row.css";
import movieTrailer from "movie-trailer";
import { useNavigate } from "react-router-dom";
import YouTube from "react-youtube";

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

  const navigate = useNavigate();

  // setup page navigation

  const handlePlayClick = (event) => {
    event.preventDefault();

    // here we should the call seen movies

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
    navigate(`/movie/${movie.movie_id}`, {state: {movie}});
  };

  const handleMovieClick = (event, movie) => {
    event.preventDefault();
    setMovie(movie);

    if (trailerUrl) {
      setTrailerUrl("");
    }
    setShowModal(!showModal)
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies === undefined || movies.length === 0 ? (
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
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
      {showModal && (
        <div className="movie_options">
            <button className="movie_button" onClick={(event) => handlePlayClick(event)}>Play</button>
            <button className="movie_button" onClick={(event) => handleViewClick(event)}>View</button>
        </div>
      )}
    </div>
  );
};

export default Row;
