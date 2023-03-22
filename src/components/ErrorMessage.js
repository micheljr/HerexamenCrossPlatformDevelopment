import React from 'react';
import { Text, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

export default function ErrorMessage({ message }) {
  const theme = useTheme();
  const { flex1, columnCenter, fullscreen } = styles;

  return (
    <View
      style={[
        flex1,
        columnCenter,
        fullscreen,
        {
          backgroundColor: theme.colors.errorContainer,
        },
      ]}
    >
      <Text variant="titleMedium" style={{ color: theme.colors.error }}>
        {message}
      </Text>
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
  fullscreen: {
    height: '100%',
    width: '100%',
  },
});
