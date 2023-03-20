import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, FlatList } from 'react-native';
import { TouchableRipple, useTheme, Text, Divider } from 'react-native-paper';
import { findMoviesByTitle } from '../utils/omdbApi';
import EmptyScreen from '../components/EmptyScreen';
import ErrorMessage from '../components/ErrorMessage';
import MovieListItem from '../components/MovieListItem';

export default function MovieList() {
  const navigation = useNavigation();
  const { flex1, columnCenter, rowCenter, fullscreen } = styles;
  const theme = useTheme();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [requestFailed, setRequestFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const throwError = () => {
    throw new Error('Failed!');
  };

  useEffect(() => {
    (async () => {
      const searchString = 'The+lord+of+the+rings';
      try {
        const moviesList = await findMoviesByTitle(searchString);
        setTimeout(() => {
          setMovies(moviesList.Search);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        setErrorMessage(error.message);
        setRequestFailed(true);
        setIsLoading(false);
      }
    })();
  }, [
    setMovies,
    findMoviesByTitle,
    setIsLoading,
    setRequestFailed,
    setErrorMessage,
  ]);

  const onPressItem = (index) => {
    const selectedMovie = movies[index];
    console.log(selectedMovie);

    navigation.navigate('Tabs', {
      screen: 'MovieDetails',
      initial: false,
      params: { movieId: selectedMovie.imdbID },
    });
  };

  const Separator = () => <Divider theme={theme} />;
  const KeyExtractor = (item, index) => index.toString();
  const RenderItem = ({ item, index }) => (
    <MovieListItem item={item} index={index} onPressItem={onPressItem} />
  );

  return isLoading ? (
    <EmptyScreen />
  ) : requestFailed ? (
    <ErrorMessage message={errorMessage} />
  ) : (
    <View style={[flex1, columnCenter]}>
      <FlatList
        style={[flex1, fullscreen]}
        data={movies.sort((a, b) => a.Year > b.Year)}
        KeyExtractor={KeyExtractor}
        renderItem={RenderItem}
        ItemSeparatorComponent={Separator}
      />
    </View>
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
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreen: {
    height: '100%',
    width: '100%',
  },
});
