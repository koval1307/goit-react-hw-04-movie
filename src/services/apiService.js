import axios from "axios";
const apiKey = "add96bc16de760017b7a79136a2ecf18";

export const fetchMovieSearch = async (query) => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=en-US&page=1&include_adult=false`
  );
  return res.data.results;
};

export const fetchPopularMovies =  axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`
    );

export const fetchMoiveOverview =id => {
   return axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
      )
      .then((res) => res.data);
      
}

export const fetchMovieCast = id => {
    return axios
      .get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`)
      .then((res) => res.data.cast);
}

export const fetchMovieReviews = id => {
    return axios.get(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${apiKey}`
    ).then((res) => res.data.results)
}