import React, { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {
  NavigationContainer,
  useNavigation,
  useRoute,
  useTheme,
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { getHeaderTitle } from '@react-navigation/elements';
import { Appbar, BottomNavigation } from 'react-native-paper';
import { useState } from 'react';

import Home from '../screens/Home';
import Welcome from '../screens/Welcome';
import MovieDetails from '../screens/MovieDetails';

//const PERSISTENCE_KEY = 'NAVIGATION_STATE';

//const RootStack = createStackNavigator();

// export default function RootNavigation({ toggleTheme }) {
//   const theme = useTheme();

//   return (
//     <NavigationContainer theme={theme}>
//       <RootStack.Navigator>
//         {/* <RootStack.Screen
//           name="Root"
//           component={DrawerNavigation}
//           options={{ headerShown: false }}
//         /> */}

//         <RootStack.Screen
//           name="Drawer"
//           component={DrawerNavigation}
//           initialParams={{ toggleTheme }}
//         />
//         {/* <DrawerNavigation toggleTheme={toggleTheme} />
//         </RootStack.Screen> */}
//       </RootStack.Navigator>
//       <StatusBar style={!theme.isV3 || theme.dark ? 'light' : 'dark'} />
//     </NavigationContainer>
//   );
// }

// const Drawer = createDrawerNavigator();

// export function DrawerNavigation({ toggleTheme }) {
//   return (
//     <SafeAreaInsetsContext.Consumer>
//       {(insets) => {
//         const { left, right } = insets || { left: 0, right: 0 };
//         const collapsedDrawerWidth = 250 + Math.max(left, right);

//         return (
//           <Drawer.Navigator
//             screenOptions={{
//               drawerStyle: {
//                 width: collapsedDrawerWidth,
//               },
//             }}
//             drawerContent={() => <DrawerContent toggleTheme={toggleTheme} />}
//           >
//             <Drawer.Screen name="Home" component={HomeNavigator} />
//           </Drawer.Navigator>
//         );
//       }}
//     </SafeAreaInsetsContext.Consumer>
//   );
// }

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
      <MovieStack.Screen name="MovieList" component={Home} />
      <MovieStack.Screen name="MovieDetails" component={MovieDetails} />
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
      key: 'books',
      title: 'Books',
      focusedIcon: 'movie',
      unfocusedIcon: 'movie-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    movies: MovieNavigator,
    books: Home,
  });

  return (
    <BottomNavigation
      screenOptions={{ headerShown: false }}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
