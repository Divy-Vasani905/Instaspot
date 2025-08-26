import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'

const InputNormal = ({ placeholder, keyboardType }) => {
    return (
        <View>
            <TextInput
                placeholder={placeholder}
                style={styles.TextInput}
                keyboardType={keyboardType}
            />
        </View>
    )
}

export default InputNormal

const styles = StyleSheet.create({
    TextInput: {
        width: 350,
        height: 55,
        fontSize: 17,
        borderWidth: 1,
        borderColor: '#dbdbdbff',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginVertical: 10,
    },
})