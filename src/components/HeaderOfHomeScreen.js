import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import messenger from '../assets/image/messager-icon/messenger.png';

import { COLORS } from '../constants/color';
import { useNavigation } from '@react-navigation/native';

const HeaderOfHomeScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text style={styles.logoText}>
                Instagram
            </Text>
            <View style={styles.subContainer}>
                <TouchableOpacity onPress={() => { navigation.navigate('NotificationScreen') }}>
                    <FontAwesome name="heart-o" size={24} color={COLORS.homeScreen.textColor} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('MessageScreen') }}>
                    <Image
                        style={styles.messengerIcon}
                        source={messenger}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HeaderOfHomeScreen

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 18,
        paddingVertical: 5,
    },
    logoText: {
        fontFamily: 'Lobster-Regular',
        fontSize: 25,
        color: COLORS.homeScreen.textColor,
    },
    subContainer: {
        width: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    messengerIcon: {
        width: 27,
        height: 27,
        resizeMode: 'contain',
    },
})