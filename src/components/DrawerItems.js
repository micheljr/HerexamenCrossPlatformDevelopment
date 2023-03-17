import React from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { StyleSheet, View } from 'react-native';
import {
  Drawer,
  Switch,
  Text,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';

export default function DrawerItems({ toggleTheme }) {
  const { isV3, colors, dark } = useTheme();

  return (
    <DrawerContentScrollView
      alwaysBounceVertical={false}
      style={[
        styles.drawerContent,
        {
          backgroundColor: colors.surface,
        },
      ]}
    >
      <View>
        <Drawer.Section title="Preferences">
          <TouchableRipple onPress={toggleTheme}>
            <View style={[styles.preference, isV3 && styles.v3Preference]}>
              <Text variant="labelLarge">Dark Theme</Text>
              <View pointerEvents="none">
                <Switch value={!dark} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
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
  badge: {
    alignSelf: 'center',
  },
  collapsedSection: {
    marginTop: 16,
  },
  annotation: {
    marginHorizontal: 24,
    marginVertical: 6,
  },
});
