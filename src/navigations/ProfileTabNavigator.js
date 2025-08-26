import { Image } from 'react-native'
import React from 'react'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import PostsViewOfProfileScreen from '../components/PostsViewOfProfileScreen';
import ReelsViewOfProfileScreen from '../components/ReelsViewOfProfileScreen';
import TagsViewOfProfileScreen from '../components/TagsViewOfProfileScreen';

import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import video_play from '../assets/image/video-play-icon/video-play.png'
import video_play_fill from '../assets/image/video-play-icon/video-play-fill.png'
import tag from '../assets/image/tag-icon/tag.png'
import tag_fill from '../assets/image/tag-icon/tag-fill.png'

const Tab = createMaterialTopTabNavigator();

const ProfileTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: { backgroundColor: '#000' },
                tabBarIndicatorStyle: { backgroundColor: '#fff', height: 1.5, width: 65, marginLeft: 40, marginRight: 10, marginBottom: 5 },
                tabBarPressColor: 'transparent',
                sceneContainerStyle: { backgroundColor: '#000' },
            }}
        >
            <Tab.Screen
                name="Posts"
                component={PostsViewOfProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        focused
                            ? <Fontisto
                                name="nav-icon-grid"
                                size={20}
                                color={'#fff'}
                                style={{
                                    transform: [
                                        { scaleX: 0.9 },
                                        { scaleY: 1.1 }
                                    ]
                                }}
                            />
                            : <MaterialIcons
                                name="grid-on"
                                size={25}
                                color={'#888'}
                                style={{
                                    transform: [
                                        { scaleX: 1.1 },
                                        { scaleY: 1.3 }
                                    ]
                                }}
                            />
                    ),
                }}
            />
            <Tab.Screen
                name="Reels"
                component={ReelsViewOfProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={
                                focused
                                    ? video_play_fill
                                    : video_play
                            }
                            style={{ width: 35, height: 35 }}
                            resizeMode='cover'
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Tagged"
                component={TagsViewOfProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={
                                focused
                                    ? tag_fill
                                    : tag
                            }
                            style={{ width: 32, height: 32, }}
                            resizeMode='contain'
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default ProfileTabNavigator
