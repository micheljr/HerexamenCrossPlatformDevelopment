import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { findMovieById } from '../utils/omdbApi';
import EmptyScreen from '../components/EmptyScreen';

export default function MovieDetails() {
  const route = useRoute();
  const theme = useTheme();
  const [movie, setMovie] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { flex1, columnCenter } = styles;

  const { movieId } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      const movieRequest = await findMovieById(movieId);

      setTimeout(() => {
        setMovie(movieRequest);
        setIsLoading(false);
      }, 1000);
    };
    fetchData().catch((error) => console.log(error));
  }, [setMovie, findMovieById]);

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

  return isLoading ? <EmptyScreen style={flex1} /> : <Details />;
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
