import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { TouchableRipple, useTheme, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// const handleEnterPress = () => {
//   this.props.navigation.navigate('Tabs');
// };

export default function Welcome({ navigation }) {
  const { flex1 } = styles;
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        flex1,
        {
          backgroundColor: theme.colors.background,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      <TouchableRipple
        style={[
          flex1,
          {
            backgroundColor: theme.colors.background,
            width: '100%',
            height: '100%',
            padding: 10,
          },
        ]}
        onPress={() => {
          navigation.navigate('Main');
        }}
        rippleColor="rgba(0, 0, 0, .32)"
      >
        <View style={[flex1, { backgroundColor: theme.colors.background }]}>
          <Text variant="titleLarge" style={{ color: theme.colors.primary }}>
            Welkom!
          </Text>
          <Text variant="titleMedium" style={{ color: theme.colors.secondary }}>
            Raak aan om verder te gaan
          </Text>
          <StatusBar style="auto" />
        </View>
      </TouchableRipple>
    </View>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
