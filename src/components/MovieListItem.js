import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text, TouchableRipple, useTheme } from 'react-native-paper';

export default function MovieListItem({ item, index, onPressItem }) {
  const theme = useTheme();
  const { flex1, rowCenter, columnCenter } = styles;

  return (
    <View
      style={[
        flex1,
        { backgroundColor: theme.colors.background, height: 150, padding: 5 },
      ]}
    >
      <TouchableRipple
        style={flex1}
        onPress={() => {
          onPressItem(index);
        }}
        rippleColor="rgba(0, 0, 0, .32)"
      >
        <View style={[flex1, rowCenter, { padding: 5 }]}>
          <Image
            source={{ uri: item.Poster }}
            style={{ width: 75, height: 75, borderRadius: 5, marginRight: 5 }}
          />
          <View style={[columnCenter, { flex: 2 }]}>
            <Text
              variant="titleMedium"
              style={{ color: theme.colors.primary, fontWeight: 'bold' }}
            >
              {item.Title}
            </Text>
            <View
              style={[
                flex1,
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                },
              ]}
            >
              <Text
                variant="titleSmall"
                style={{ color: theme.colors.secondary }}
              >
                Jaar: {item.Year}
              </Text>
              <Text
                variant="titleSmall"
                style={{ color: theme.colors.secondary }}
              >
                Categorie: {item.Type}
              </Text>
            </View>
          </View>
        </View>
      </TouchableRipple>
    </View>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
