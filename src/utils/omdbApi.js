const apiKey = '2a779f03';
const getApiUrl = () => `http://www.omdbapi.com/?apikey=${apiKey}`;
const getTitleUrl = (title) =>
  `http://www.omdbapi.com/?s=${title}&apikey=${apiKey}`;

export const findMoviesByTitle = async (title) => {
  const apiUrl = getApiUrl();
  const url = `${apiUrl}&s=${title}`;
  console.log(`findMoviesByTitle: ${url}`);

  return await request(url, {
    method: 'GET',
  });
  // return fetch(url, {
  //   method: 'GET',
  // })
  //   .then((res) => res.json())
  //   .then((json) => console.log(json))
  //   .catch((error) => console.log(error));
};

export const findMovieById = (movieId) => {
  const apiUrl = getApiUrl();
  const url = `${apiUrl}&i=${movieId}`;
  console.log(`findMovieById: ${url}`);

  return request(url, {
    method: 'GET',
  });
};

async function request(url, options) {
  return await fetch(url, options)
    .then((res) => res.json())
    .then((json) => json)
    .catch((error) => console.log(error));
}
