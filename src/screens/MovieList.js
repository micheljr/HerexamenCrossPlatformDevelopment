import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useTheme, Divider, Searchbar } from 'react-native-paper';
import { findMoviesByTitle } from '../utils/omdbApi';
import EmptyScreen from '../components/EmptyScreen';
import ErrorMessage from '../components/ErrorMessage';
import MovieListItem from '../components/MovieListItem';

export default function MovieList() {
  const navigation = useNavigation();
  const { flex1, columnCenter, fullscreen } = styles;
  const theme = useTheme();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [requestFailed, setRequestFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchBarText, setSearchBarText] = useState('The lord of the rings');
  const [searchQuery, setSearchQuery] = useState(searchBarText);

  useEffect(() => {
    (async () => {
      const searchString = encodeURIComponent(searchQuery);

      if ((searchString.trim().length || 0) > 0) {
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
      } else {
        setErrorMessage('Geef een titel op');
        setRequestFailed(true);
        setIsLoading(false);
      }
    })();
  }, [searchQuery]);

  const onPressItem = (index) => {
    const selectedMovie = movies[index];

    navigation.navigate('Tabs', {
      screen: 'MovieDetails',
      initial: false,
      params: { movieId: selectedMovie.imdbID },
    });
  };

  const onChangeSearch = (query) => setSearchBarText(query);

  const handleSearch = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();

      setIsLoading(true);
      setRequestFailed(false);
      setMovies([]);
      setSearchQuery(searchBarText);
    }
  };

  const Separator = () => <Divider theme={theme} />;
  const KeyExtractor = (item, index) => index.toString();
  const RenderItem = ({ item, index }) => (
    <MovieListItem item={item} index={index} onPressItem={onPressItem} />
  );

  return (
    <View style={[flex1, columnCenter]}>
      <Searchbar
        mode="view"
        placeholder="Zoek"
        value={searchBarText}
        onChangeText={onChangeSearch}
        onKeyPress={handleSearch}
        style={{ width: '100%' }}
      />
      {isLoading ? (
        <EmptyScreen />
      ) : requestFailed ? (
        <ErrorMessage message={errorMessage} />
      ) : (
        <FlatList
          style={[flex1, fullscreen]}
          data={movies.sort((a, b) => a.Year > b.Year)}
          KeyExtractor={KeyExtractor}
          renderItem={RenderItem}
          ItemSeparatorComponent={Separator}
        />
      )}
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
