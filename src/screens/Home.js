import React from 'react';
import { View, StyleSheet, Text, StatusBar } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LightDarkButton } from '../components/LightDarkButton';

// const handleEnterPress = () => {
//   this.props.navigation.navigate('Tabs');
// };

export default function Home({ toggleTheme }) {
  const { flex1 } = styles;
  const theme = useTheme();

  return (
    <SafeAreaView style={[flex1, { backgroundColor: theme.colors.background }]}>
      <View style={[flex1, { backgroundColor: theme.colors.background }]}>
        <Text style={{ color: theme.colors.primary, fontSize: theme.fontSize }}>
          Open up App.js to start working on your app!
        </Text>
        <StatusBar style="auto" />
        <View style={{ flexDirection: 'row' }}>
          <LightDarkButton toggle={toggleTheme} />
        </View>
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
