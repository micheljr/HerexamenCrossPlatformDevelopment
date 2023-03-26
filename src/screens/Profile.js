import React from 'react';
import { Dimensions, Image, ScrollView, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const profile = {
  firstName: 'Michel',
  lastName: 'Stroobants',
  image: 'https://i1.sndcdn.com/artworks-w9ht3oxvoTryPDV4-CsowBg-t500x500.jpg',
  street: 'Neerstraat 105',
  place: 'Oud-Turnhout',
  dob: '18/01/1995',
};

export default function Profile() {
  const { height } = Dimensions.get('window');
  const theme = useTheme();

  return (
    <ScrollView style={{ flex: 1, height: '100%', width: '100%' }}>
      <View
        style={{
          backgroundColor: theme.colors.background,
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 20,
          paddingRight: 20,
          minHeight: height,
          width: '100%',
        }}
      >
        <Image
          source={{ uri: profile.image }}
          style={{ height: 250, width: 250, borderRadius: 5, marginBottom: 25 }}
        />
        <View style={{ flex: 1, height: '100%', width: '100%' }}>
          <View style={{ flex: 1, width: '100%', height: '100%' }}>
            <Text
              variant="titleMedium"
              style={{ color: theme.colors.primary, fontWeight: 'bold' }}
            >
              Name
            </Text>
            <Text
              variant="labelLarge"
              style={{ color: theme.colors.secondary }}
            >
              {profile.firstName} {profile.lastName}
            </Text>
          </View>
          <View style={{ flex: 1, width: '100%', height: '100%' }}>
            <Text
              variant="titleMedium"
              style={{ color: theme.colors.primary, fontWeight: 'bold' }}
            >
              Residence
            </Text>
            <Text
              variant="labelLarge"
              style={{ color: theme.colors.secondary }}
            >
              {profile.street}
            </Text>
            <Text
              variant="labelLarge"
              style={{ color: theme.colors.secondary }}
            >
              {profile.place}
            </Text>
          </View>
          <View style={{ flex: 1, width: '100%', height: '100%' }}>
            <Text
              variant="titleMedium"
              style={{ color: theme.colors.primary, fontWeight: 'bold' }}
            >
              Date of birth
            </Text>
            <Text
              variant="labelLarge"
              style={{ color: theme.colors.secondary }}
            >
              {profile.dob}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
