import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const respone = await fetch("https://swapi.dev/api/films/"); // extracting data from API (External)
      console.log(respone);
      if (!respone.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await respone.json(); // parsing the data in JavaScript Object
      console.log(data);

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseData: movieData.release_data,
        };
      });
      setMovie(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  },[]);

  useEffect(() => {
    fetchMoviesHandler();
  },[fetchMoviesHandler]);

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;

// function fetchMoviesHandler() {
//   fetch("https://swapi.dev/api/films/") // extracting data from API (External)
//   .then((respone) => {
//     return respone.json();  // parsing the data in JavaScript Object
//   })
//   .then((data) => {
//     // data is array of object information
//     const transformedMovies = data.results.map((movieData) => {
//       return {
//         id: movieData.episode_id,
//         title: movieData.title,
//         openingText: movieData.opening_crawl,
//         releaseData: movieData.release_data,
//       };
//     });
//     setMovie(transformedMovies);
//   })
// }

/* <section>
{!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
{!isLoading && movies.length === 0 && <p>Found no movie.</p>}
{isLoading && <p>Loading...</p>}
</section> */
