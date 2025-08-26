import { StyleSheet, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'

const Button = ({ onSubmitTitle, onSubmitMsg, buttonTxt, onClick }) => {
    const onSubmit = () => {
        if (onClick) return onClick();
        Alert.alert(onSubmitTitle, onSubmitMsg);
    }
    return (
        <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.buttonTxt}>
                {buttonTxt}
            </Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#365ce3ff',
        width: 350,
        height: 50,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
    },
    buttonTxt: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
})