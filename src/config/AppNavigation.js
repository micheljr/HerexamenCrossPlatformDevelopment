import React from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/Home';

const RootStack = createNativeStackNavigator();

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

const HomeScreen = createNativeStackNavigator();

export function HomeNavigator({ toggleTheme }) {
  return (
    <HomeScreen.Navigator>
      <HomeScreen.Screen
        name="Home"
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
