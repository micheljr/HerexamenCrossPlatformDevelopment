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

export default function DrawerItems({
  toggleTheme,
  //   toggleRTL,
  //   toggleThemeVersion,
  //   toggleCollapsed,
  //   toggleCustomFont,
  //   customFontLoaded,
  //   collapsed,
  //   isRTL,
  isDarkTheme,
}) {
  const [drawerItemIndex, setDrawerItemIndex] = React.useState(0);
  //const preferences = React.useContext(PreferencesContext);

  const _setDrawerItem = (index) => setDrawerItemIndex(index);

  const { isV3, colors, dark } = useTheme();

  //   const _handleToggleRTL = () => {
  //     toggleRTL();
  //     I18nManager.forceRTL(!isRTL);
  //     if (isWeb) {
  //       Updates.reloadAsync();
  //     }
  //   };

  //   const coloredLabelTheme = {
  //     colors: isV3
  //       ? {
  //           secondaryContainer: MD3Colors.tertiary80,
  //           onSecondaryContainer: MD3Colors.tertiary20,
  //         }
  //       : {
  //           primary: MD2Colors.tealA200,
  //         },
  //   };
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
      {/* {isV3 && collapsed && (
        <Drawer.Section style={styles.collapsedSection}>
          {DrawerCollapsedItemsData.map((props, index) => (
            <Drawer.CollapsedItem
              {...props}
              key={props.key}
              active={drawerItemIndex === index}
              onPress={() => {
                _setDrawerItem(index);
                index === 4 && preferences.toggleCollapsed();
              }}
            />
          ))}
        </Drawer.Section>
      )} */}
      {/* {!collapsed && ( */}
      {
        <View>
          {/* <Drawer.Section title="Example items">
            {DrawerItemsData.map((props, index) => (
              <Drawer.Item
                {...props}
                key={props.key}
                theme={props.key === 3 ? coloredLabelTheme : undefined}
                active={drawerItemIndex === index}
                onPress={() => _setDrawerItem(index)}
              />
            ))}
          </Drawer.Section> */}

          <Drawer.Section title="Preferences">
            <TouchableRipple onPress={toggleTheme}>
              <View style={[styles.preference, isV3 && styles.v3Preference]}>
                <Text variant="labelLarge">Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={!dark} />
                </View>
              </View>
            </TouchableRipple>

            {/* <TouchableRipple onPress={_handleToggleRTL}>
              <View style={[styles.preference, isV3 && styles.v3Preference]}>
                <Text variant="labelLarge">RTL</Text>
                <View pointerEvents="none">
                  <Switch value={isRTL} />
                </View>
              </View>
            </TouchableRipple> */}

            {/* <TouchableRipple onPress={toggleThemeVersion}>
              <View style={[styles.preference, isV3 && styles.v3Preference]}>
                <Text variant="labelLarge">MD 2</Text>
                <View pointerEvents="none">
                  <Switch value={!isV3} />
                </View>
              </View>
            </TouchableRipple>

            {isV3 && (
              <TouchableRipple onPress={toggleCollapsed}>
                <View style={[styles.preference, isV3 && styles.v3Preference]}>
                  <Text variant="labelLarge">Collapsed drawer *</Text>
                  <View pointerEvents="none">
                    <Switch value={collapsed} />
                  </View>
                </View>
              </TouchableRipple>
            )}

            {isV3 && (
              <TouchableRipple onPress={toggleCustomFont}>
                <View style={[styles.preference, isV3 && styles.v3Preference]}>
                  <Text variant="labelLarge">Custom font *</Text>
                  <View pointerEvents="none">
                    <Switch value={customFontLoaded} />
                  </View>
                </View>
              </TouchableRipple>
            )} */}
          </Drawer.Section>
          {/* {isV3 && !collapsed && (
            <Text variant="bodySmall" style={styles.annotation}>
              * - available only for MD3
            </Text>
          )} */}
          {/* <Text variant="bodySmall" style={styles.annotation}>
            React Native Paper Version{' '}
            {require('react-native-paper/package.json').version}
          </Text> */}
        </View>
      }
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
