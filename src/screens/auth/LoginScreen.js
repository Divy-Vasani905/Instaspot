import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import InputNormal from '../../components/InputNormal'
import InputPassword from '../../components/InputPassword'
import Button from '../../components/Button'

import Instagram from '../../assets/image/instagram-logo/Instagram.png';
import Meta from '../../assets/image/meta-logo/Meta.png';

import { COLORS } from '../../constants/color'

const LoginScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Image
                    style={styles.image}
                    source={Instagram}
                />
                <Text style={styles.logoText}>
                    Instagram
                </Text>
                <InputNormal
                    placeholder="Email address or mobile number"
                    keyboardType='email-address'
                />
                <InputPassword
                    placeholder="Password"
                />
                <Button
                    onSubmitTitle="Login"
                    onSubmitMsg="Login SuccessFully."
                    buttonTxt="Log in"
                    onClick={() => navigation.replace('Home')}
                />
                <TouchableOpacity
                    onPress={() => { }}
                >
                    <Text style={styles.forgotText}>
                        Forgotten password?
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.secondSubContainer}>
                <TouchableOpacity
                    style={styles.createBtn}
                    onPress={() => { navigation.navigate('Register') }}
                >
                    <Text style={styles.createBtnText}>
                        Create new account
                    </Text>
                </TouchableOpacity>
                <View>
                    <Image
                        style={styles.metaImage}
                        source={Meta}
                    />
                </View>
            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.loginScreen.backgroundColor,
    },
    subContainer: {
        flex: 0.9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondSubContainer: {
        flex: 0.17,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 70,
        height: 70,
        resizeMode: 'cover',
        marginBottom: 5,
    },
    logoText: {
        fontFamily: 'Lobster-Regular',
        fontSize: 52,
        fontWeight: 'ultralight',
        color: COLORS.loginScreen.textColor,
        marginBottom: 20,
    },
    forgotText: {
        color: COLORS.loginScreen.textColor,
        fontSize: 17,
    },
    createBtn: {
        width: 350,
        height: 50,
        borderWidth: 1,
        borderColor: COLORS.loginScreen.buttonColor,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
    createBtnText: {
        color: COLORS.loginScreen.buttonColor,
        fontSize: 17,
    },
    metaImage: {
        width: 95,
        height: 50,
        resizeMode: 'contain',
        opacity: 0.6,
    },
})