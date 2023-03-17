const apiKey = '2a779f03';
const getUrlFor = (searchString) => {
  return `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchString}`;
};

export const getData = async (searchString) => {
  const url = getUrlFor(searchString);
  console.log(url);

  return await fetch(url, {
    method: 'get',
  })
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((error) => console.log(error));
};
