import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';

export default function EmptyScreen() {
  const { flex1, columnCenter, fullscreen } = styles;
  const theme = useTheme();

  return (
    <View
      style={[
        flex1,
        columnCenter,
        fullscreen,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <ActivityIndicator size={50} color={theme.PRIMARY_COLOR} />
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
