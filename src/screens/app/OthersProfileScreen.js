import { View, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants/color'

import HeaderOfProfileScreen from '../../components/HeaderOfProfileScreen'
import ProfileDetails from '../../components/ProfileDetails'
import Highlight from '../../components/Highlight'
import ProfileTabNavigator from '../../navigations/ProfileTabNavigator'

const OthersProfileScreen = ({ route, navigation }) => {
    const { item } = route.params;
    return (
        <SafeAreaView style={styles.SafeAreaViewContainer} edges={['top', 'left', 'right']}>
            <View style={styles.container}>
                <HeaderOfProfileScreen username={item?.user?.username} />
                <ProfileDetails userData={item?.user} />
                <Highlight otherUser={true} />
                <View style={{ height: 460, marginBottom: 70 }}>
                    <ProfileTabNavigator />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default OthersProfileScreen

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