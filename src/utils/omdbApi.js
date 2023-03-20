import axios from 'axios';

const APIKEY = '2a779f03';
const getApiUrl = () => `http://www.omdbapi.com/?apikey=${APIKEY}`;

export const findMoviesByTitle = async (title) => {
  const apiUrl = getApiUrl();
  const url = `${apiUrl}&s=${title}`;

  return await getRequest(url);
};

export const findMovieById = async (movieId) => {
  const apiUrl = getApiUrl();
  const url = `${apiUrl}&i=${movieId}`;
  return await getRequest(url);
};

async function getRequest(url) {
  return await axios({
    method: 'GET',
    url: url,
    timeout: 5000,
  }).then((res) => res.data);
}
