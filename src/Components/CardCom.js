import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// import { useNavigate } from "react-router-dom";

function CardCom() {
  // const navigate = useNavigate();
  const IMAGE_PATH = "https://www.themoviedb.org/t/p/w440_and_h660_face";

  const API_ENV = process.env.REACT_APP_TMDB_MOVIE_API_KEY;
  const NO_IMAGE_URL = "/assets/No-Image-Placeholder.png";
  // const API_URL = "https://api.themoviedb.org/3/movie/";

  //useState
  const [movie, setMovie] = React.useState([]);
  const [similarMovie, setSimilarMovie] = React.useState([]);
  const [popularMovie, setPopularMovie] = React.useState([]);
  const [upcomingMovie, setupcommingMovie] = React.useState([]);

  // const [clicked, setClicked] = React.useState(false);
  const getPopularMovie = async () => {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/week",
      {
        params: {
          api_key: API_ENV,
        },
      }
    );

    console.log(data);
    setPopularMovie(data?.results);
  };

  const getMovie = async () => {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/movie/141052/recommendations",
      {
        params: {
          api_key: API_ENV,
          language: "en-US",
        },
      }
    );
    console.log(data);
    setMovie(data?.results);
  };

  const similarGetMovie = async () => {
    const { data, status } = await axios.get(
      "https://api.themoviedb.org/3/movie/594767/recommendations",
      {
        params: {
          api_key: API_ENV,
        },
      }
    );
    setSimilarMovie(data?.results);
    console.log(data);
    console.log(status);
  };

  const getUpcomingMovie = async () => {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/movie/upcoming",
      {
        params: {
          api_key: API_ENV,
          language: "en-US",
          page: "1",
          region: "IN",
        },
      }
    );
    setupcommingMovie(data?.results);
  };

  useEffect(() => {
    getMovie();
    similarGetMovie();
    getPopularMovie();
    getUpcomingMovie();
    // getUserMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pt-16 pl-2 pb-12 text-white">
      <p className="text-2xl">Trending Movies</p>
      <div className="flex w-[96vw] overflow-x-scroll no-scrollbar">
        {popularMovie.map(
          ({ id, poster_path, original_title, release_date }, key) => (
            <div
              key={key}
              className="min-w-[160px] text-gray-400 text-center m-2 cursor-pointer"
            >
              <Link to={`/home/moviedetails/` + id}>
                <img
                  src={
                    poster_path
                      ? `${IMAGE_PATH}${poster_path}`
                      : `${NO_IMAGE_URL}`
                  }
                  alt="hi"
                  className="rounded w-full h-[250px] object-cover min-h-[250px] bg-white"
                />
                <p className="line-clamp-2">{original_title}</p>
                {/* <span>{release_date}</span> */}
              </Link>
            </div>
          )
        )}
      </div>
      <p className="text-2xl">Popular Movies</p>
      <div className="flex w-[96vw] overflow-x-scroll no-scrollbar">
        {movie.map(({ id, poster_path, original_title, release_date }, key) => (
          <div
            key={key}
            className="min-w-[160px] text-gray-400 text-center m-2 cursor-pointer"
          >
            <Link to={`/home/moviedetails/` + id}>
              <img
                src={
                  poster_path
                    ? `${IMAGE_PATH}${poster_path}`
                    : `${NO_IMAGE_URL}`
                }
                alt="hi"
                className="rounded w-full h-[250px] object-cover min-h-[250px] bg-white"
              />
              <p className="line-clamp-2">{original_title}</p>
              {/* <span>{release_date}</span> */}
            </Link>
          </div>
        ))}
      </div>

      <p className="text-2xl">Similar Movies</p>
      <div className="flex w-[96vw] overflow-x-scroll no-scrollbar">
        {similarMovie.map(
          ({ id, poster_path, original_title, release_date }, key) => (
            <div
              key={id}
              className="min-w-[160px] text-gray-400 text-center m-2"
            >
              <Link to={`/home/moviedetails/` + id}>
                <img
                  src={
                    poster_path
                      ? `${IMAGE_PATH}${poster_path}`
                      : `${NO_IMAGE_URL}`
                  }
                  alt={id}
                  className="rounded w-full h-[250px] object-cover min-h-[250px] bg-white"
                />
                <p className="line-clamp-2">{original_title}</p>
                {/* <span>{release_date}</span> */}
              </Link>
            </div>
          )
        )}
      </div>

      <p className="text-2xl">Upcomming Movies</p>
      <div className="flex w-[96vw] overflow-x-scroll no-scrollbar">
        {upcomingMovie.map(
          ({ id, poster_path, original_title, release_date }, key) => (
            <div
              key={key}
              className="min-w-[160px] text-gray-400 text-center m-2 cursor-pointer"
            >
              <Link to={`/home/moviedetails/` + id}>
                <img
                  src={
                    poster_path
                      ? `${IMAGE_PATH}${poster_path}`
                      : `${NO_IMAGE_URL}`
                  }
                  alt="hi"
                  className="rounded w-full h-[250px] object-cover min-h-[250px] bg-white"
                />
                <p className="line-clamp-2">{original_title}</p>
                {/* <span>{release_date}</span> */}
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default CardCom;
