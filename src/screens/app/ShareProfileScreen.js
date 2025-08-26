import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

import qr_code from '../../assets/image/qr-code/qr2.jpg'
import download from '../../assets/image/download/download.png'
import { COLORS } from '../../constants/color';

import LinearGradient from 'react-native-linear-gradient';

const ShareProfileScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.SafeAreaViewContainer} edges={['top', 'left', 'right']}>
            <LinearGradient
                colors={['#ffda1fff', '#ff4e50', '#f8485fff']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }} style={styles.container}
            >
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <MaterialIcons name='close' size={35} color={'#fff'} />
                    </TouchableOpacity>
                </View>

                <Image source={qr_code} style={styles.Image} resizeMode='contain' />

                <View style={styles.card}>
                    <TouchableOpacity style={styles.action}>
                        <View style={styles.iconWrapper}>
                            <Ionicons name='share-social-outline' size={28} color="#000" />
                        </View>
                        <Text style={styles.label}>Share profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action}>
                        <View style={styles.iconWrapper}>
                            <AntDesign name='link' size={28} color="#000" />
                        </View>
                        <Text style={styles.label}>Copy link</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action}>
                        <View style={styles.iconWrapper}>
                            <Image source={download} style={{ width: 28, height: 28 }} resizeMode='contain' />
                        </View>
                        <Text style={styles.label}>Download</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </SafeAreaView>
    )
}

export default ShareProfileScreen

const styles = StyleSheet.create({
    SafeAreaViewContainer: {
        flex: 1,
        paddingTop: 35,
        backgroundColor: COLORS.homeScreen.backgroundColor,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginVertical: 15,
        gap: 20
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Image: {
        width: '80%',
        height: '40%',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingHorizontal: 50,
        paddingVertical: 30,
        borderRadius: 10,
        marginTop: 20
    },
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
        marginVertical: 20,
        justifyContent: "space-around",
        alignItems: "center",
        width: "80%",
        elevation: 5, // Android shadow
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
    },
    action: {
        alignItems: "center",
        flex: 1,
    },
    iconWrapper: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "#ddd",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
    },
    label: {
        fontSize: 14,
        color: "#000",
        textAlign: "center",
    },
})