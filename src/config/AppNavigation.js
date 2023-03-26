import React, { Platform } from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { NavigationContainer, useTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { getHeaderTitle } from '@react-navigation/elements';
import { Appbar, BottomNavigation } from 'react-native-paper';
import { useState } from 'react';

import Welcome from '../screens/Welcome';
import MovieDetails from '../screens/MovieDetails';
import DrawerItems from '../components/DrawerItems';
import MovieList from '../screens/MovieList';
import Profile from '../screens/Profile';

const Drawer = createDrawerNavigator();
const DrawerContent = ({ toggleTheme }) => (
  <DrawerItems toggleTheme={toggleTheme} />
);

export function DrawerNavigation({ toggleTheme }) {
  const theme = useTheme();

  return (
    <NavigationContainer theme={theme}>
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
              drawerContent={() => <DrawerContent toggleTheme={toggleTheme} />}
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
  );
}

const HomeScreen = createStackNavigator();

export function HomeNavigator() {
  return (
    <HomeScreen.Navigator screenOptions={{ headerShown: false }}>
      <HomeScreen.Screen name="Welcome" component={Welcome} />
      <HomeScreen.Screen name="Tabs" component={TabsNavigator} />
    </HomeScreen.Navigator>
  );
}

//const tabs = createBottomTabNavigator();

const MovieStack = createStackNavigator();

export function MovieNavigator() {
  const cardStyleInterpolator =
    Platform.OS === 'android'
      ? CardStyleInterpolators.forFadeFromBottomAndroid
      : CardStyleInterpolators.forHorizontalIOS;

  return (
    <MovieStack.Navigator
      screenOptions={({ navigation }) => ({
        detachPreviousScreen: !navigation.isFocused(),
        cardStyleInterpolator,
        header: ({ route, options, back }) => {
          const title = getHeaderTitle(options, route.name);
          return (
            <Appbar.Header elevated>
              {back ? (
                <Appbar.BackAction onPress={() => navigation.goBack()} />
              ) : null}
              <Appbar.Content title={title} />
              {navigation.openDrawer ? (
                <Appbar.Action
                  icon="menu"
                  isLeading
                  onPress={() => navigation.openDrawer()}
                />
              ) : null}
            </Appbar.Header>
          );
        },
      })}
    >
      <MovieStack.Screen name="Movies" component={MovieList} />
      <MovieStack.Screen name="Details" component={MovieDetails} />
    </MovieStack.Navigator>
  );
}

export function TabsNavigator() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: 'movies',
      title: 'Movies',
      focusedIcon: 'book',
      unfocusedIcon: 'book-outline',
    },
    {
      key: 'profile',
      title: 'Profile',
      focusedIcon: 'account',
      unfocusedIcon: 'account-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    movies: MovieNavigator,
    profile: Profile,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
