import React from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import Home from '../screens/Home';

const PERSISTENCE_KEY = 'NAVIGATION_STATE';

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
        {() => (
          //(insets) => {
          //const { left, right } = insets || { left: 0, right: 0 };
          // <Drawer.Navigator drawerContent={() => <DrawerContent />}>
          <Drawer.Navigator>
            <Drawer.Screen name="Home" options={{ headerShown: false }}>
              {() => <HomeNavigator toggleTheme={toggleTheme} />}
            </Drawer.Screen>
          </Drawer.Navigator>
        )}
      </SafeAreaInsetsContext.Consumer>
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
