import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../../constants/color'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { userData } from '../../utils/userData'
import avatar from '../../assets/image/avatar-icon/avatar.png'
import EditProfileInputs from '../../components/EditProfileInputs';
import CustomSwitch from '../../components/Toggle';

const EditProfileScreen = () => {
    const navigation = useNavigation()

    return (
        <SafeAreaView style={styles.SafeAreaViewContainer} edges={['top', 'left', 'right']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <MaterialIcons name='arrow-back' size={30} color={'#fff'} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>
                    Edit profile
                </Text>
            </View>
            <ScrollView style={styles.container}>
                <View style={styles.pictureContainer}>
                    <View style={styles.subPicContainer}>
                        <TouchableOpacity style={styles.storyItem} onPress={() => { navigation.navigate() }}>
                            <View style={styles.userStoryCircle}>
                                <Image source={{ uri: userData.profilePic }} style={styles.profileImage} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.storyItem} onPress={() => { navigation.navigate() }}>
                            <View style={[styles.userStoryCircle, { backgroundColor: '#555', borderRadius: 60 }]}>
                                <Image source={avatar} style={styles.avatarImage} resizeMode='contain' />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.changePicContainer}>
                        <Text style={styles.changePicText}>Change profile photo</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 10 }}>
                    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('EditValueScreen', { label: "Name", value: "Divy Vasani" })}>
                        <EditProfileInputs label="Name" value={'Divy Vasani'} editable={false} />
                    </TouchableOpacity>
                    <EditProfileInputs label="Username" value={'divy_vasani'} editable={false} />
                    <EditProfileInputs label="Pronouns" value={''} editable={false} />
                    <EditProfileInputs label="Bio" value={'I ❤️ My Self\nI am a developer'} editable={false} />
                </View>

                <View>
                    <TouchableOpacity style={{ paddingVertical: 10 }}>
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Add link</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingVertical: 10 }}>
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Add banners</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 5 }}>
                    <EditProfileInputs label="Gender" value={'Male'} editable={false} dropdown={true} />
                </View>

                <View style={styles.musicContainer}>
                    <TextInput
                        style={[
                            styles.musicInput,
                        ]}
                        placeholder='Music'
                        placeholderTextColor={'#fff'}
                        value={''}
                    />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                    <View style={{ width: '80%' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>Show Threads badge</Text>
                        <Text style={{ fontSize: 14, color: '#bbb' }}>When turned off, the Instagram badge on your Threads profile will also disappear.</Text>
                    </View>
                    <View>
                        <CustomSwitch />
                    </View>
                </View>

                <View style={{ marginTop: 10, marginBottom: 30 }}>
                    <TouchableOpacity style={{ paddingVertical: 10 }}>
                        <Text style={{ color: '#8d89ffff', fontSize: 16 }}>
                            Switch to professional account
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingVertical: 10 }}>
                        <Text style={{ color: '#8d89ffff', fontSize: 16 }}>
                            Personal information settings
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingVertical: 10 }}>
                        <Text style={{ color: '#8d89ffff', fontSize: 16 }}>
                            Show that your profile is verified
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default EditProfileScreen

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
        color: '#fff'
    },
    container: {
        padding: 10,
    },
    pictureContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    subPicContainer: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    storyItem: {
        width: 70,
        height: 70,
        alignItems: 'center',
        marginRight: 12,
    },
    userStoryCircle: {
        borderRadius: 50,
    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 60,
    },
    avatarImage: {
        width: 30,
        height: 30,
        margin: 20,
        borderRadius: 60,
    },
    changePicContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    changePicText: {
        fontSize: 15,
        color: '#8d89ffff',
    },
    musicContainer: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#555',
        paddingTop: 10,
    },
    musicInput: {
        height: 40,
        fontSize: 18,
        color: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#999',
    },
});