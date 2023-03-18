import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, FlatList } from 'react-native';
import {
  TouchableRipple,
  useTheme,
  Text,
  ActivityIndicator,
  Divider,
  Avatar,
} from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { findMoviesByTitle } from '../utils/omdbApi';

// const handleEnterPress = () => {
//   this.props.navigation.navigate('Tabs');
// };

export default function MovieList() {
  const navigation = useNavigation();
  const { flex1, columnCenter, rowCenter } = styles;
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const searchString = 'The+lord+of+the+rings';

    const fetchData = async () => {
      const moviesList = await findMoviesByTitle(searchString);

      setMovies(moviesList.Search);
    };
    fetchData().catch((error) => console.log(error));
  }, [setMovies, findMoviesByTitle]);

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
    <View style={flex1}>
      <ActivityIndicator size={50} color={theme.colors.backdrop} />
    </View>
  );
  const RenderItem = ({ item, index }) => {
    console.log(item.Poster);
    return (
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
          <View style={[flex1, rowCenter]}>
            {/* <Image
              style={[flex1, { height: 200, width: '100%' }]}
              source={item.Poster}
            /> */}
            <Avatar.Image size={75} source={item.Poster} />
            <Text style={{ flex: 3 }}>{item.Title}</Text>
          </View>
        </TouchableRipple>
      </View>
    );
  };

  return (
    <View style={[flex1, columnCenter]}>
      <FlatList
        style={[flex1, { width: '100%', height: '100%' }]}
        data={movies}
        KeyExtractor={KeyExtractor}
        renderItem={RenderItem}
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={ListEmptyComponent}
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
});
