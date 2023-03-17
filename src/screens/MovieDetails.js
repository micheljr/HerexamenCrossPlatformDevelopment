import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

export default function MovieDetails() {
  const route = useRoute();
  const theme = useTheme();

  const { movieId } = route.params;

  console.log('Detailscreen: ' + movieId);

  return (
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
}
