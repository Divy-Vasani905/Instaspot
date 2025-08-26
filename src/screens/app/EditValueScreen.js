import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EditProfileInputs from '../../components/EditProfileInputs';
import { COLORS } from '../../constants/color';

const EditValueScreen = ({ route }) => {
    const navigation = useNavigation();
    const { label, value, editable = true, multiline = false, dropdown = false } = route.params
    console.log(label, value)

    return (
        <SafeAreaView style={styles.SafeAreaViewContainer} edges={['top', 'left', 'right']}>
            <View style={[styles.header, { justifyContent: 'space-between' }]}>
                <>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <MaterialIcons name='close' size={30} color={'#fff'} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>
                        {label}
                    </Text>
                </>
                <View>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <MaterialIcons name='check' size={30} color={'lightgreen'} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.container}>
                <View style={{ marginHorizontal: 15 }}>
                    <EditProfileInputs label={label} value={value} editable={editable} dropdown={dropdown} multiline={multiline} />
                </View>
                <Text style={styles.infoText}>
                    Help people discover your account by using you're known by: either your full name, nickname, or business name.
                </Text>
                <Text style={styles.infoText}>
                    You can only change your name twice within 14 days.
                </Text>
                <Text style={styles.infoText}>
                    Your name is visible to everyone on and off Instagram.
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default EditValueScreen

const styles = StyleSheet.create({
    SafeAreaViewContainer: {
        flex: 1,
        paddingTop: 35,
        backgroundColor: COLORS.homeScreen.backgroundColor,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginVertical: 15,
        gap: 20
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    infoText: {
        color: '#ccc',
        fontSize: 12,
        marginHorizontal: 15,
        marginTop: 10,
    },
    container: {
        marginTop: 20,
    }
})