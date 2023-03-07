import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import ThemeManager, { themable } from 'react-themable';
import Button from './src/components/Button';

// tip: import theme variables from different files (e.g. ./themes/dark.theme.js)
const globalThemeVariables = { fontSize: 20 };
const darkThemeVariables = { backgroundColor: '#333333', color: '#666666' };
const lightThemeVariables = { backgroundColor: '#eeeeee', color: '#111111' };

// configure variables (optional, but makes life easier)
// if I dont pass a theme, styles will be applied globally.
// you can also specify the themes as an array at the first argument (e.g. ['dark', 'light'])
ThemeManager.addVariables(globalThemeVariables);
ThemeManager.addVariables('dark', darkThemeVariables);
ThemeManager.addVariables('light', lightThemeVariables);

const ThemableView = themable(View);

export default function App() {
  const { styles } = ThemeManager;

  return (
    <ThemableView style={styles.container} theme="blue">
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button>Blue (Getting from context)</Button>
      <Button theme="dark">dark</Button>
      <Button theme="light">light</Button>
    </ThemableView>
  );
}

ThemeManager.create({
  container: {
    flex: 1,
    color: '#fff',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
