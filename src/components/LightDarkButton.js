import React, { StyleSheet, View } from 'react-native';
import { TouchableRipple, Switch, Text, useTheme } from 'react-native-paper';

export function LightDarkButton({ toggle }) {
  const theme = useTheme();

  return (
    <TouchableRipple onPress={toggle}>
      <View style={[styles.preference, theme.dark && styles.v3Preference]}>
        <Text
          variant="labelLarge"
          style={{ color: theme.colors.primary, marginRight: 10 }}
        >
          Dark theme
        </Text>
        <View pointerEvents="none">
          <Switch value={!theme.dark} />
        </View>
      </View>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  v3Preference: {
    height: 56,
    paddingHorizontal: 28,
  },
});

//export default LightDarkButton;
