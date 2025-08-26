import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View } from 'react-native';

// Screens
import HomeScreen from '../screens/app/HomeScreen';
import SearchScreen from '../screens/app/SearchScreen';
import ReelsScreen from '../screens/app/ReelsScreen';
import ProfileScreen from '../screens/app/ProfileScreen';
import NewActivityScreen from '../screens/app/NewActivityScreen';

import ProfileDrawerNavigator from './ProfileDrawerNavigator';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// Local assets
import video_play from '../assets/image/video-play-icon/video-play.png';
import video_play_fill from '../assets/image/video-play-icon/video-play-fill.png';

const Tab = createBottomTabNavigator();

function MainTabNavigator() {

    return (
        <Tab.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: '#111',
                    height: 70,
                    borderTopWidth: 0,
                },
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
            }}
        >
            {/* Home */}
            <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Foundation name="home" size={30} color="white" />
                        ) : (
                            <Octicons name="home" size={30} color="white" />
                        ),
                }}
            />

            {/* Search */}
            <Tab.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={focused ? 'search' : 'search-outline'}
                            color="white"
                            size={30}
                        />
                    ),
                }}
            />

            {/* New Activity (hide tab bar here) */}
            <Tab.Screen
                name="NewActivityScreen"
                component={NewActivityScreen}
                options={{
                    tabBarStyle: { display: 'none' },
                    tabBarIcon: () => (
                        <FontAwesome name="plus-square-o" color="white" size={30} />
                    ),
                }}
            />

            {/* Reels */}
            <Tab.Screen
                name="ReelsScreen"
                component={ReelsScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={focused ? video_play_fill : video_play}
                            style={{ width: 40, height: 40 }}
                            resizeMode="contain"
                        />
                    ),
                }}
            />

            {/* Profile */}
            <Tab.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                borderRadius: 50,
                                borderWidth: focused ? 2 : 0,
                                borderColor: '#fff',
                                padding: 2,
                            }}
                        >
                            <Image
                                source={{
                                    uri: 'https://randomuser.me/api/portraits/men/1.jpg',
                                }}
                                style={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: 50,
                                }}
                            />
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default MainTabNavigator;
