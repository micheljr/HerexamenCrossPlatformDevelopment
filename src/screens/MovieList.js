import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, FlatList } from 'react-native';
import {
  TouchableRipple,
  useTheme,
  Text,
  ActivityIndicator,
  Divider,
} from 'react-native-paper';
import { findMoviesByTitle } from '../utils/omdbApi';

export default function MovieList() {
  const navigation = useNavigation();
  const { flex1, columnCenter, rowCenter } = styles;
  const theme = useTheme();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const searchString = 'The+lord+of+the+rings';

    const fetchData = async () => {
      const moviesList = await findMoviesByTitle(searchString);

      setMovies(moviesList.Search);
      setIsLoading(false);
    };

    fetchData().catch((error) => console.log(error));
  }, [setMovies, findMoviesByTitle, setIsLoading]);

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
  const ListEmptyComponent = () => (
    <View style={[flex1, columnCenter, { height: '100%', width: '100%' }]}>
      <ActivityIndicator size={50} color={theme.PRIMARY_COLOR} />
    </View>
  );
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

  // TODO isLoading verwijderen?? Flatlist wordt niet getoond nadat movies opgehaald zijn.
  return isLoading ? (
    <View style={[flex1, columnCenter]}>
      <FlatList
        style={[flex1, { width: '100%', height: '100%' }]}
        data={movies.sort((a, b) => a.Year > b.Year)}
        KeyExtractor={KeyExtractor}
        renderItem={RenderItem}
        ItemSeparatorComponent={Separator}
        //ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  ) : (
    <ListEmptyComponent />
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
});
