import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import MainTabNavigator from './MainTabNavigator';

import HomeScreen from '../screens/app/HomeScreen';
import StoryScreen from '../screens/app/StoryScreen';
import PostsView from '../components/PostsView';
import TagedPostsView from '../components/TagedPostsView';
import EditProfileScreen from '../screens/app/EditProfileScreen';
import EditValueScreen from '../screens/app/EditValueScreen';
import ShareProfileScreen from '../screens/app/ShareProfileScreen';
import NotificationScreen from '../screens/app/NotificationScreen';
import OthersProfileScreen from '../screens/app/OthersProfileScreen';
import MessageScreen from '../screens/app/MessageScreen';
import NewMessageScreen from '../screens/app/NewMessageScreen';
import ChatScreen from '../screens/app/ChatScreen';
import ChatDetailsScreen from '../screens/app/ChatDetailsScreen';
import ReelsView from '../components/ReelsView';
import Privacy_SafetyOfMessageScreen from '../screens/app/Privacy_SafetyOfMessageScreen';
import Gallery from '../screens/app/Gallery';
import NewActivityScreen from '../screens/app/NewActivityScreen';
import EditActivityScreen from '../screens/app/EditActivityScreen';
import CenteredTabsWithPages from '../screens/app/CenteredTabsWithPages';
import FinalPageOfNewPost from '../screens/app/FinalPageOfNewPost';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false, orientation: 'portrait' }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Home" component={MainTabNavigator} />
            <Stack.Screen name="NewActivityScreen" component={NewActivityScreen} />
            <Stack.Screen name="Gallery" component={Gallery} />
            <Stack.Screen name="CenteredTabsWithPages" component={CenteredTabsWithPages} />
            <Stack.Screen name="EditActivityScreen" component={EditActivityScreen} />
            <Stack.Screen name="FinalPageOfNewPost" component={FinalPageOfNewPost} />
            <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
            <Stack.Screen name="MessageScreen" component={MessageScreen} />
            <Stack.Screen name="NewMessageScreen" component={NewMessageScreen} />
            <Stack.Screen name="Privacy_Safety" component={Privacy_SafetyOfMessageScreen} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
            <Stack.Screen name="ChatDetailsScreen" component={ChatDetailsScreen} />
            <Stack.Screen name="OthersProfileScreen" component={OthersProfileScreen} />
            <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
            <Stack.Screen name="EditValueScreen" component={EditValueScreen} />
            <Stack.Screen name="ShareProfileScreen" component={ShareProfileScreen} />
            <Stack.Screen name="StoryScreen" component={StoryScreen} />
            <Stack.Screen name="PostsView" component={PostsView} />
            <Stack.Screen name="ReelsView" component={ReelsView} />
            <Stack.Screen name="TagedPostsView" component={TagedPostsView} />
        </Stack.Navigator>
    );
};

export default AppNavigator;