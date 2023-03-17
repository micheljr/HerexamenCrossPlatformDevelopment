import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
  Provider as PaperProvider,
  MD3LightTheme,
  MD3DarkTheme,
  adaptNavigationTheme,
  MD2LightTheme,
  MD2DarkTheme,
} from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {
  SafeAreaProvider,
  SafeAreaInsetsContext,
} from 'react-native-safe-area-context';
import { createDrawerNavigator } from '@react-navigation/drawer';

//import RootNavigation from './src/config/AppNavigation';
import RootNavigation, {
  DrawerNavigation,
  HomeNavigator,
} from './src/config/AppNavigation';

import DrawerItems from './src/components/DrawerItems';

const PREFERENCES_KEY = 'APP_PREFERENCES';

export const PreferencesContext = React.createContext(null);

export default function App() {
  useKeepAwake();

  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [themeVersion, setThemeVersion] = React.useState(3);

  const themeMode = isDarkMode ? 'dark' : 'light';

  const theme = {
    2: {
      light: MD2LightTheme,
      dark: MD2DarkTheme,
    },
    3: {
      light: MD3LightTheme,
      dark: MD3DarkTheme,
    },
  }[themeVersion][themeMode];

  // const preferences = React.useMemo(
  //   () => ({
  //     toggleTheme: () => setIsDarkMode((oldValue) => !oldValue),
  //     toggleCustomFont: () => setCustomFont(!customFontLoaded),
  //     toggleThemeVersion: () => {
  //       setCustomFont(false);
  //       setCollapsed(false);
  //       setThemeVersion((oldThemeVersion) => (oldThemeVersion === 2 ? 3 : 2));
  //     },
  //     customFontLoaded,
  //     collapsed,
  //     rtl,
  //     theme,
  //   }),
  //   [rtl, theme, collapsed, customFontLoaded]
  // );

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

  const Drawer = createDrawerNavigator();
  const DrawerContent = () => <DrawerItems toggleTheme={toggleTheme} />;

  return (
    <SafeAreaProvider
      style={{ backgroundColor: combinedTheme.colors.background }}
    >
      <PaperProvider theme={combinedTheme}>
        <NavigationContainer theme={combinedTheme}>
          <SafeAreaInsetsContext.Consumer>
            {(insets) => {
              const { left, right } = insets || { left: 0, right: 0 };
              const collapsedDrawerWidth = 250 + Math.max(left, right);
              return (
                <Drawer.Navigator
                  screenOptions={{
                    drawerStyle: {
                      width: collapsedDrawerWidth,
                    },
                  }}
                  drawerContent={() => <DrawerContent />}
                >
                  <Drawer.Screen
                    name="Home"
                    component={HomeNavigator}
                    options={{ headerShown: false }}
                  />
                </Drawer.Navigator>
              );
            }}
          </SafeAreaInsetsContext.Consumer>
        </NavigationContainer>
        {/* <RootNavigation
          toggleTheme={() => toggleTheme()}
          style={styles.container}
        /> */}
        {/* <RootNavigation
          style={styles.container}
          toggleTheme={() => toggleTheme()}
        /> */}
        {/* <DrawerNavigation
          toggleTheme={() => toggleTheme()}
          style={styles.container}
        /> */}
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
