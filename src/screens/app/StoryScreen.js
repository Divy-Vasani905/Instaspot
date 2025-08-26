import React from 'react'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import StoryViewCard from '../../components/StoryViewCard'

import { COLORS } from '../../constants/color'

const StoryScreen = ({ navigation, route }) => {
    return (
        <SafeAreaView style={styles.SafeAreaViewContainer} edges={['top', 'left', 'right']}>
            <View style={styles.container}>
                <StoryViewCard
                    navigation={navigation}
                    id={route.params.id}
                />
            </View>
        </SafeAreaView>
    )
}

export default StoryScreen

const styles = StyleSheet.create({
    SafeAreaViewContainer: {
        flex: 1,
        paddingTop: 35,
        backgroundColor: COLORS.homeScreen.backgroundColor,
    },
    container: {
        flex: 1,
        marginVertical: 20,
        backgroundColor: COLORS.homeScreen.backgroundColor,
    },
})