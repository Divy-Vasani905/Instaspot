import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';


const EditProfileInputs = ({ label, value, editable = true, multiline = false, dropdown = false }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [input, setInput] = useState(value);
    const navigation = useNavigation();

    return (
        // <TouchableOpacity style={styles.container} onPress={navigation.navigate('EditValueScreen', { label: label, value: input })}>
        <View style={styles.container}>
            <Text
                style={[
                    styles.label,
                    (isFocused || value) ? styles.labelFocused : null,
                    !editable && { color: '#999' },
                ]}
            >
                {label}
            </Text>

            <TextInput
                style={[
                    styles.input,
                    multiline && styles.multiline,
                ]}
                value={input}
                onChangeText={setInput}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                multiline={multiline}
                editable={editable}
            />
            {dropdown && <Feather name="chevron-down" size={20} color="#fff" style={styles.dropdown} />}
        </View>
    );
};

export default EditProfileInputs

const styles = StyleSheet.create({
    container: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingTop: 18,
    },
    label: {
        position: 'absolute',
        left: 15,
        top: 18,
        fontSize: 16,
        color: '#999',
    },
    labelFocused: {
        top: 0,
        fontSize: 13,
        color: '#fff',
        fontWeight: '700',
    },
    input: {
        height: 40,
        fontSize: 16,
        color: '#fff',
    },
    multiline: {
        height: 80,
        textAlignVertical: 'top',
    },
    disabledInput: {
        color: '#999',
    },
    dropdown: {
        position: 'absolute',
        right: 15,
        top: 20,
    },
});
