import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';
import { findMovieById } from '../utils/omdbApi';

export default function MovieDetails() {
  const route = useRoute();
  const theme = useTheme();
  const [movie, setMovie] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { movieId } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      const movieRequest = await findMovieById(movieId);
      console.log(movieRequest);

      setMovie(movieRequest);
      setIsLoading(false);
    };
    fetchData().catch((error) => console.log(error));
  }, [setMovie, findMovieById]);

  const details = () => (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
      }}
    >
      <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
        {movieId}
      </Text>
    </View>
  );

  const spinner = isLoading ? (
    <View style={{ marginTop: 20 }}>
      <ActivityIndicator size="large" color={theme.PRIMARY_COLOR} />
    </View>
  ) : null;

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {spinner}
    </View>
  );
}
