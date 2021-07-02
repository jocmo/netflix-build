const API_KEY = "435f61ef668b9d39dd1f9b36282c520c";

const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    fetchAnimes: `/discover/tv?api_key=${API_KEY}&with_genres=16`,
    fetchR: `/discover/movie/?api_key=${API_KEY}&with_genres=10770`,
};

//https://api.themoviedb.org/3/trending/all/week?api_key=435f61ef668b9d39dd1f9b36282c520c&language=en-US

//https://api.themoviedb.org/3/discover/movie?api_key=435f61ef668b9d39dd1f9b36282c520c&with_genres=28

export default requests;