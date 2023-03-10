import React from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import Home from '../screens/Home';
import DrawerItems from '../components/DrawerItems';

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
              <Drawer.Screen name="Home" options={{ headerShown: false }}>
                {() => <HomeNavigator toggleTheme={toggleTheme} />}
              </Drawer.Screen>
            </Drawer.Navigator>
          );
        }}
      </SafeAreaInsetsContext.Consumer>
    </NavigationContainer>
  );
}

const DrawerContent = ({ toggleTheme }) => {
  const theme = useTheme();

  return (
    // <PreferencesContext.Consumer>
    //   {(preferences) => (
    <DrawerItems toggleTheme={toggleTheme} />
    //   )}
    // </PreferencesContext.Consumer>
  );
};

const HomeScreen = createNativeStackNavigator();

export function HomeNavigator({ toggleTheme }) {
  return (
    <HomeScreen.Navigator>
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
