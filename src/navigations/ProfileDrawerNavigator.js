import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import ProfileScreen from '../screens/app/ProfileScreen';
import EditProfileScreen from '../screens/app/EditProfileScreen';
import ShareProfileScreen from '../screens/app/ShareProfileScreen';
import { View } from 'react-native';

const Drawer = createDrawerNavigator();

export default function ProfileDrawerNavigator() {
  return (
    <View style={{ flex: 1 }}>
      <Drawer.Navigator
        initialRouteName="ProfileScreen"
        screenOptions={{
          headerShown: true,
        }}
      >
        <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
        <Drawer.Screen name="EditProfileS" component={EditProfileScreen} />
        <Drawer.Screen name="ShareProfileS" component={ShareProfileScreen} />
      </Drawer.Navigator>
    </View>
  );
}
