import * as React from 'react';
import {
  Provider as PaperProvider,
  MD3LightTheme,
  MD3DarkTheme,
  adaptNavigationTheme,
} from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

//import RootNavigation from './src/config/AppNavigation';
import { DrawerNavigation } from './src/config/AppNavigation';

export const PreferencesContext = React.createContext(null);

export default function App() {
  useKeepAwake();

  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

  const CombinedDefaultTheme = {
    ...MD3LightTheme,
    ...LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      ...LightTheme.colors,
    },
  };

  const CombinedDarkTheme = {
    ...MD3DarkTheme,
    ...DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      ...DarkTheme.colors,
    },
  };

  const toggleTheme = () => {
    setIsDarkMode((oldValue) => !oldValue);
  };

  const combinedTheme = isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <SafeAreaProvider
      style={{ backgroundColor: combinedTheme.colors.background }}
    >
      <PaperProvider theme={combinedTheme}>
        <DrawerNavigation toggleTheme={() => toggleTheme()} />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
