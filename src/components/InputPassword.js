import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import Icon from 'react-native-vector-icons/Feather';

const InputPassword = ({ placeholder }) => {
    const [isShowPassword, setIsShowPassword] = useState(false)

    return (
        <View style={styles.container}>
            <TextInput
                minLength={6}
                maxLength={16}
                placeholder={placeholder}
                style={styles.TextInput}
                secureTextEntry={!isShowPassword}
            />
            <TouchableOpacity onPress={() => setIsShowPassword(!isShowPassword)}>
                <Icon name={isShowPassword ? "eye" : "eye-off"} style={styles.icon} size={22} color="#d5d5d5ff" />
            </TouchableOpacity>
        </View>
    )
}

export default InputPassword

const styles = StyleSheet.create({
    container: {
        width: 350,
        height: 55,
        fontSize: 17,
        borderWidth: 1,
        borderColor: '#dbdbdbff',
        borderRadius: 10,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    TextInput: {
        width: 300,
        height: 55,
        fontSize: 17,
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    icon: {
        marginRight: 10,
    },
})