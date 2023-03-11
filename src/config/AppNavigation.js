import React, { Platform, View } from 'react-native';
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
import { Appbar } from 'react-native-paper';

import Home from '../screens/Home';
import DrawerItems from '../components/DrawerItems';

const PERSISTENCE_KEY = 'NAVIGATION_STATE';

const RootStack = createStackNavigator();

export default function RootNavigation({ toggleTheme }) {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Root"
          //     component={HomeNavigator}
          options={{ headerShown: false }}
        >
          {() => <HomeNavigator toggleTheme={toggleTheme} />}
        </RootStack.Screen>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const Drawer = createDrawerNavigator();

export function DrawerNavigation({ toggleTheme }) {
  const theme = useTheme();

  return (
    <NavigationContainer
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
              <Drawer.Screen name="Home">
                {() => <HomeNavigator toggleTheme={toggleTheme} />}
              </Drawer.Screen>
            </Drawer.Navigator>
          );
        }}
      </SafeAreaInsetsContext.Consumer>
      <StatusBar style={!theme.isV3 || theme.dark ? 'light' : 'dark'} />
    </NavigationContainer>
  );
}

const DrawerContent = ({ toggleTheme }) => (
  // <PreferencesContext.Consumer>
  //   {(preferences) => (
  <DrawerItems toggleTheme={toggleTheme} />
  //   )}
  // </PreferencesContext.Consumer>
);

const HomeScreen = createStackNavigator();

export function HomeNavigator({ toggleTheme }) {
  const theme = useTheme();
  const cardStyleInterpolator =
    Platform.OS === 'android'
      ? CardStyleInterpolators.forFadeFromBottomAndroid
      : CardStyleInterpolators.forHorizontalIOS;

  return (
    <HomeScreen.Navigator
      screenOptions={({ navigation }) => {
        return {
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
        };
      }}
    >
      <HomeScreen.Screen
        name="Main"
        //   component={Home}
        options={{ headerShown: false, toggleTheme }}
      >
        {() => <Home toggleTheme={toggleTheme} />}
      </HomeScreen.Screen>
      {/* <HomeScreen.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      /> */}
    </HomeScreen.Navigator>
  );
}
