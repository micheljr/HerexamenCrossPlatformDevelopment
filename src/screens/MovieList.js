import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, FlatList } from 'react-native';
import { TouchableRipple, useTheme, Text, Divider } from 'react-native-paper';
import { findMoviesByTitle } from '../utils/omdbApi';
import EmptyScreen from '../components/EmptyScreen';
import ErrorMessage from '../components/ErrorMessage';

export default function MovieList() {
  const navigation = useNavigation();
  const { flex1, columnCenter, rowCenter, fullscreen } = styles;
  const theme = useTheme();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [requestFailed, setRequestFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
        setIsLoading(false);
        setRequestFailed(true);
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

    navigation.navigate('Tabs', {
      screen: 'MovieDetails',
      initial: false,
      params: { movieId: selectedMovie.imdbID },
    });
  };

  const Separator = () => <Divider theme={theme} />;
  const KeyExtractor = (item, index) => index.toString();
  const RenderItem = ({ item, index }) => (
    <View
      style={[
        flex1,
        { backgroundColor: theme.colors.background, height: 150, padding: 5 },
      ]}
    >
      <TouchableRipple
        style={flex1}
        onPress={() => {
          onPressItem(index);
        }}
        rippleColor="rgba(0, 0, 0, .32)"
      >
        <View style={[flex1, rowCenter, { padding: 5 }]}>
          <Image
            source={{ uri: item.Poster }}
            style={{ width: 75, height: 75, borderRadius: 5, marginRight: 5 }}
          />
          <Text style={{ flex: 1 }}>{item.Title}</Text>
        </View>
      </TouchableRipple>
    </View>
  );

  return isLoading ? (
    <EmptyScreen />
  ) : !requestFailed ? (
    <View style={[flex1, columnCenter]}>
      <FlatList
        style={[flex1, fullscreen]}
        data={movies.sort((a, b) => a.Year > b.Year)}
        KeyExtractor={KeyExtractor}
        renderItem={RenderItem}
        ItemSeparatorComponent={Separator}
      />
    </View>
  ) : (
    <ErrorMessage message={errorMessage} />
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
