import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import InputNormal from '../../components/InputNormal'
import InputPassword from '../../components/InputPassword'
import Button from '../../components/Button'

import Instagram from '../../assets/image/instagram-logo/Instagram.png';
import Meta from '../../assets/image/meta-logo/Meta.png';

import { COLORS } from '../../constants/color'

const RegisterScreen = ({ navigation }) => {
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
                    placeholder="Username"
                    keyboardType='default'
                />
                <InputNormal
                    placeholder="Email address or mobile number"
                    keyboardType='email-address'
                />
                <InputPassword
                    placeholder="Password"
                />
                <InputPassword
                    placeholder="Confirm Password"
                />
                <Button
                    onSubmitTitle="SignUp"
                    onSubmitMsg="SignUp SuccessFully."
                    buttonTxt="Sign Up"
                    onClick={() => navigation.navigate('Login')}
                />
            </View>
            <View style={styles.secondSubContainer}>
                <TouchableOpacity
                    style={styles.createBtn}
                    onPress={() => { navigation.navigate('Login') }}
                >
                    <Text style={styles.createBtnText}>
                        Already have an account
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

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.registerScreen.backgroundColor,
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
        color: COLORS.registerScreen.textColor,
        marginBottom: 20,
    },
    forgotText: {
        color: COLORS.registerScreen.textColor,
        fontSize: 17,
    },
    createBtn: {
        width: 350,
        height: 50,
        borderWidth: 1,
        borderColor: COLORS.registerScreen.buttonColor,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
    createBtnText: {
        color: COLORS.registerScreen.buttonColor,
        fontSize: 17,
    },
    metaImage: {
        width: 95,
        height: 50,
        resizeMode: 'contain',
        opacity: 0.6,
    },
})