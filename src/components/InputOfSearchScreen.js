import { StyleSheet, View, TextInput } from 'react-native'
import React, { useEffect, useRef } from 'react'

import { COLORS } from '../constants/color'
import Icon from 'react-native-vector-icons/FontAwesome'

const InputOfSearchScreen = ({ searchText, setSearchText }) => {
    const inputRef = useRef(null);
    useEffect(() => {
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    }, [])

    return (
        <View style={styles.container}>
            <Icon name="search" size={20} color={COLORS.searchScreen.textColor} />
            <TextInput
                ref={inputRef}
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor="#9d9d9dff"
                value={searchText}
                onChangeText={setSearchText}
            />
        </View>
    )
}

export default InputOfSearchScreen

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#212121ff',
        alignItems: 'center',
        borderRadius: 50,
        marginVertical: 8,
        marginHorizontal: 13,
        paddingHorizontal: 13,
    },
    searchInput: {
        width: '80%',
        backgroundColor: '#212121ff',
        color: COLORS.searchScreen.textColor,
        fontSize: 16,
        marginHorizontal: 5,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
})