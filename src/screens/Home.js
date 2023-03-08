import React from 'react';
import { View, StyleSheet, Text, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LightDarkButton } from '../components/LightDarkButton';

// const handleEnterPress = () => {
//   this.props.navigation.navigate('Tabs');
// };

export default function Home({ toggleTheme, theme }) {
  const { flex1 } = styles;

  return (
    <SafeAreaView style={[flex1, { backgroundColor: theme.colors.background }]}>
      <View style={[flex1, { backgroundColor: theme.colors.background }]}>
        <Text style={{ color: theme.colors.primary }}>
          Open up App.js to start working on your app!
        </Text>
        <StatusBar style="auto" />
        <LightDarkButton toggleTheme={toggleTheme} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
