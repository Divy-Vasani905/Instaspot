import { View, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants/color'

import HeaderOfProfileScreen from '../../components/HeaderOfProfileScreen'
import ProfileDetails from '../../components/ProfileDetails'
import Highlight from '../../components/Highlight'
import ProfileTabNavigator from '../../navigations/ProfileTabNavigator'

const ProfileScreen = () => {
    return (
        <SafeAreaView style={styles.SafeAreaViewContainer} edges={['top', 'left', 'right']}>
            <View style={styles.container}>
                <HeaderOfProfileScreen />
                <ProfileDetails />
                <Highlight />
                <View style={{ height: 460, marginBottom: 70 }}>
                    <ProfileTabNavigator />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    SafeAreaViewContainer: {
        flex: 1,
        paddingTop: 35,
        backgroundColor: COLORS.homeScreen.backgroundColor,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.homeScreen.backgroundColor,
    },
})