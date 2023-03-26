import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
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
        setMovie(movieRequest);
        setIsLoading(false);
      } catch (error) {
        setErrorMessage(error.message);
        setRequestFailed(true);
        setIsLoading(false);
      }
    };
    fetchData().catch((error) => console.log(error));
  }, [setMovie, findMovieById, setIsLoading, setRequestFailed]);

  const Details = () => (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View
        style={[
          flex1,
          columnCenter,
          {
            backgroundColor: theme.colors.background,
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 20,
            paddingRight: 20,
          },
        ]}
      >
        <View
          style={[
            flex1,
            {
              flexDirection: 'row',
              alignContent: 'center',
              justifyContent: 'flex-start',
              width: '100%',
              height: 250,
              marginBottom: 25,
            },
          ]}
        >
          <Image
            source={{ uri: movie.Poster }}
            style={{
              height: 250,
              width: 150,
              marginRight: 5,
            }}
          />
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              padding: 10,
            }}
          >
            <Text
              variant="titleLarge"
              style={{ color: theme.colors.primary, fontWeight: 'bold' }}
            >
              {movie.Title}
            </Text>
            <Text variant="titleSmall" style={{ color: theme.colors.primary }}>
              {movie.Genre}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            marginTop: 10,
            width: '100%',
            gap: 10,
          }}
        >
          <View style={{ flex: 1, width: '100%' }}>
            <Text
              variant="titleMedium"
              style={{ color: theme.colors.primary, fontWeight: 'bold' }}
            >
              Released
            </Text>
            <Text
              style={{ color: theme.colors.secondary }}
              variant="labelLarge"
            >
              {movie.Released}
            </Text>
            <Text
              variant="titleMedium"
              style={{ color: theme.colors.primary, fontWeight: 'bold' }}
            >
              Writers
            </Text>
            <Text
              style={{ color: theme.colors.secondary }}
              variant="labelLarge"
            >
              {movie.Writer}
            </Text>
            <Text
              variant="titleMedium"
              style={{ color: theme.colors.primary, fontWeight: 'bold' }}
            >
              Cast
            </Text>
            <Text
              style={{ color: theme.colors.secondary }}
              variant="labelLarge"
            >
              {movie.Actors}
            </Text>
            <Text
              variant="titleMedium"
              style={{ color: theme.colors.primary, fontWeight: 'bold' }}
            >
              Plot
            </Text>
            <Text
              style={{ color: theme.colors.secondary }}
              variant="labelLarge"
            >
              {movie.Plot}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
