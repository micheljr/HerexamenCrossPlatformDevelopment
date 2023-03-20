import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { findMovieById } from '../utils/omdbApi';
import EmptyScreen from '../components/EmptyScreen';
import ErrorMessage from '../components/ErrorMessage';

export default function MovieDetails() {
  const route = useRoute();
  const theme = useTheme();
  const [movie, setMovie] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [requestFailed, setRequestFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { flex1, columnCenter } = styles;

  const { movieId } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieRequest = await findMovieById(movieId);
        setTimeout(() => {
          setMovie(movieRequest);
          console.log(movieRequest);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        setErrorMessage(error.message);
        setRequestFailed(true);
        setIsLoading(false);
      }
    };
    fetchData().catch((error) => console.log(error));
  }, [setMovie, findMovieById, setIsLoading, setRequestFailed]);

  const Details = () => (
    <View
      style={[
        flex1,
        columnCenter,
        {
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
        {movie.Title}
      </Text>
    </View>
  );

  return isLoading ? (
    <EmptyScreen style={flex1} />
  ) : requestFailed ? (
    <ErrorMessage message={errorMessage} />
  ) : (
    <Details />
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  columnCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// {
//   "Title": "The Lord of the Rings: The Two Towers",
//   "Year": "2002",
//   "Rated": "T",
//   "Released": "22 Oct 2002",
//   "Runtime": "N/A",
//   "Genre": "Action, Adventure, Fantasy",
//   "Director": "N/A",
//   "Writer": "Philippa Boyens (screenplay), Nuno Miranda (adaptation), Nuno Miranda (translation), J.R.R. Tolkien (novel)",
//   "Actors": "Viggo Mortensen, Orlando Bloom, John Rhys-Davies, Elijah Wood",
//   "Plot": "You control Aragorn, Legolas and Gimli fighting across the Plains of Rohan battling evil alike to the ferocious battle at Helms Deep.",
//   "Language": "English",
//   "Country": "USA",
//   "Awards": "N/A",
//   "Poster": "https://m.media-amazon.com/images/M/MV5BODI0Mzk3OTM4N15BMl5BanBnXkFtZTgwMTM4MTk4MDE@._V1_SX300.jpg",
//   "Ratings": [
//     {
//       "Source": "Internet Movie Database",
//       "Value": "8.3/10"
//     }
//   ],
//   "Metascore": "N/A",
//   "imdbRating": "8.3",
//   "imdbVotes": "2,750",
//   "imdbID": "tt0347436",
//   "Type": "game",
//   "DVD": "N/A",
//   "BoxOffice": "N/A",
//   "Production": "N/A",
//   "Website": "N/A",
//   "Response": "True"
// }
