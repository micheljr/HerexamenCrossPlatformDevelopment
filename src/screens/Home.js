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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getData } from '../utils/omdbApi';

// const handleEnterPress = () => {
//   this.props.navigation.navigate('Tabs');
// };

export default function Home() {
  const navigation = useNavigation();
  const { flex1 } = styles;
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // async function getMovies() {
    //   const movieResult = getData('The+lord+of+the+rings');
    //   setMovies(movieResult.Search);
    //   console.log(movieResult.Search);
    // }
    // getMovies();
    const searchString = 'The+lord+of+the+rings';
    const apiKey = '2a779f03';
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchString}`;

    fetch(url, {
      method: 'get',
    })
      .then((res) => res.json())
      .then((data) => setMovies(data.Search))
      .catch((error) => console.log(error));
  }, [getData, setMovies]);

  const onPressItem = (index) => {
    //console.log(`Pressed row: ${index}`);
    const selectedMovie = movies[index];
    console.log('Homescreen ' + selectedMovie.imdbID);

    navigation.navigate('Main', {
      screen: 'MovieDetails',
      initial: false,
      params: { movieId: selectedMovie.imdbID },
    });
  };

  const Separator = () => <Divider theme={theme} />;
  const KeyExtractor = (item, index) => index.toString();
  const ListEmptyComponent = () => (
    <View>
      <ActivityIndicator color={theme.colors.backdrop} />
    </View>
  );
  const RenderItem = ({ item, index }) => (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <TouchableRipple
        onPress={() => {
          onPressItem(index);
        }}
        rippleColor="rgba(0, 0, 0, .32)"
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image style={{ height: 50, width: 50 }} source={item.Poster} />
          <Text>{item.Title}</Text>
        </View>
      </TouchableRipple>
    </View>
  );

  // {
  //   Title: "The Lord of the Rings: The Fellowship of the Ring",
  //   Year: "2001",
  //   imdbID: "tt0120737",
  //   Type: "movie",
  //   Poster: "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00…ctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg"
  // }

  return (
    // <View
    //   style={[
    //     flex1,
    //     {
    //       backgroundColor: theme.colors.background,
    //       paddingTop: insets.top,
    //       paddingBottom: insets.bottom,
    //       paddingLeft: insets.left,
    //       paddingRight: insets.right,
    //     },
    //   ]}
    // >
    //   <TouchableRipple
    //     style={[
    //       flex1,
    //       {
    //         backgroundColor: theme.colors.background,
    //         width: '100%',
    //         height: '100%',
    //         padding: 10,
    //       },
    //     ]}
    //     onPress={() => {
    //       const date = new Date();
    //       console.log(
    //         `Hello world! ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    //       );
    //     }}
    //     rippleColor="rgba(0, 0, 0, .32)"
    //   >
    //     <View style={[flex1, { backgroundColor: theme.colors.background }]}>
    //       <Text variant="titleLarge" style={{ color: theme.colors.primary }}>
    //         HomeScreen
    //       </Text>
    //       <Text variant="titleMedium" style={{ color: theme.colors.secondary }}>
    //         Overzicht?
    //       </Text>
    //       <StatusBar style="auto" />
    //     </View>
    //   </TouchableRipple>
    // </View>
    <View
      style={[
        flex1,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      <FlatList
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
