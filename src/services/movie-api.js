const baseURL = 'https://api.themoviedb.org/3';

const fetchPopularMovies = () => {
  return fetch(
      `${baseURL}/trending/movie/day?api_key=1d2afcb9227364d83314bfc76c1af652`,
    )
    .then(res => res.json())
    .then(res => res.results);
};

const fetchActors = movieId => {
  return fetch(
      `${baseURL}/movie/${movieId}/credits?api_key=1d2afcb9227364d83314bfc76c1af652`,
    )
    .then(res => res.json())
    .then(res => res.cast);
};
const fetchReviews = movieId => {
  return fetch(
      `${baseURL}/movie/${movieId}/reviews?api_key=1d2afcb9227364d83314bfc76c1af652`,
    )
    .then(res => res.json())
    .then(res => res.results);
  // .then(res => res.reviews);
};

// https://developers.themoviedb.org/3/movies/get-movie-credits

const fetchMovieDetails = movieId => {
  return fetch(
    `${baseURL}/movie/${movieId}?api_key=1d2afcb9227364d83314bfc76c1af652`,
  ).then(res => res.json());
};

const fetchMovieWithQuery = searchQuery => {
  return fetch(
      `${baseURL}/search/movie?api_key=1d2afcb9227364d83314bfc76c1af652&query=${searchQuery}`,
    )
    .then(res => res.json())
    .then(res => res.results);
};

export default {
  fetchMovieDetails,
  fetchMovieWithQuery,
  fetchPopularMovies,
  fetchActors,
  fetchReviews,
};