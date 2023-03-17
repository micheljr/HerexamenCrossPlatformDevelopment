import React, { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { NavigationContainer, useTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { getHeaderTitle } from '@react-navigation/elements';
import { Appbar, BottomNavigation } from 'react-native-paper';
import { useState } from 'react';

import Home from '../screens/Home';
import DrawerItems from '../components/DrawerItems';
import Welcome from '../screens/Welcome';
import MovieDetails from '../screens/MovieDetails';

const PERSISTENCE_KEY = 'NAVIGATION_STATE';

const RootStack = createStackNavigator();

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Root"
          component={HomeNavigator}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const Drawer = createDrawerNavigator();

export function DrawerNavigation({ toggleTheme }) {
  const theme = useTheme();
  const cardStyleInterpolator =
    Platform.OS === 'android'
      ? CardStyleInterpolators.forFadeFromBottomAndroid
      : CardStyleInterpolators.forHorizontalIOS;

  return (
    <NavigationContainer
      screenOptions={({ navigation }) => ({
        detachPreviousScreen: !navigation.isFocused(),
        cardStyleInterpolator,
        header: ({ route, options, back }) => {
          const title = getHeaderTitle(options, route.name);
          return (
            <Appbar.Header elevated>
              {back ? (
                <Appbar.BackAction onPress={() => navigation.goBack()} />
              ) : navigation.openDrawer() ? (
                <Appbar.Action
                  icon="menu"
                  isLeading
                  onPress={() => navigation.openDrawer()}
                />
              ) : null}
              <Appbar.Content title={title} />
            </Appbar.Header>
          );
        },
      })}
      theme={theme}
      onStateChange={(state) =>
        AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
      }
    >
      <SafeAreaInsetsContext.Consumer>
        {(insets) => {
          const { left, right } = insets || { left: 0, right: 0 };
          const collapsedDrawerWidth = 250 + Math.max(left, right);

          return (
            <Drawer.Navigator
              screenOptions={{
                drawerStyle: {
                  //collapsed && {
                  width: collapsedDrawerWidth,
                },
              }}
              drawerContent={() => <DrawerContent toggleTheme={toggleTheme} />}
            >
              {/* </Drawer.Navigator><Drawer.Navigator> */}
              <Drawer.Screen name="Home" component={HomeNavigator} />
            </Drawer.Navigator>
          );
        }}
      </SafeAreaInsetsContext.Consumer>
      <StatusBar style={!theme.isV3 || theme.dark ? 'light' : 'dark'} />
    </NavigationContainer>
  );
}

const DrawerContent = ({ toggleTheme }) => (
  <DrawerItems toggleTheme={toggleTheme} />
);

const HomeScreen = createStackNavigator();

export function HomeNavigator() {
  return (
    <HomeScreen.Navigator screenOptions={{ headerShow: false }}>
      <HomeScreen.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <HomeScreen.Screen
        name="Main"
        component={TabsNavigator}
        options={{ headerShown: false }}
      />
    </HomeScreen.Navigator>
  );
}

//const tabs = createBottomTabNavigator();

const MovieStack = createStackNavigator();

export function MovieNavigator() {
  return (
    <MovieStack.Navigator screenOptions={{ headerShown: false }}>
      <MovieStack.Screen name="MovieList" component={Home} />
      <MovieStack.Screen name="MovieDetails" component={MovieDetails} />
    </MovieStack.Navigator>
  );
}

export function TabsNavigator() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: 'home',
      title: 'Movies',
      focusedIcon: 'book',
      unfocusedIcon: 'book-outline',
    },
    {
      key: 'home2',
      title: 'Books',
      focusedIcon: 'movie',
      unfocusedIcon: 'movie-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: MovieNavigator,
    home2: Home,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
