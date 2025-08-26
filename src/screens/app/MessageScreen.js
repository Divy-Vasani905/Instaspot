import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../../constants/color'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LinearGradient from 'react-native-linear-gradient';
import OnlinePeopleView from '../../components/OnlinePeopleView';
import { messageData } from '../../utils/messageData';

const MessageScreen = () => {
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(messageData);

    useEffect(() => {
        const filterData = messageData.filter(item =>
            item.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredData(filterData)
    }, [searchText])

    return (
        <SafeAreaView style={styles.SafeAreaViewContainer} edges={['top', 'left', 'right', 'bottom']}>
            <View style={styles.header}>
                <View style={styles.firstSubContainer}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <MaterialIcons name='arrow-back' size={30} color={'#fff'} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>
                        divy_vasani
                    </Text>
                    <TouchableOpacity onPress={() => { }}>
                        <Octicons
                            name='chevron-down'
                            size={20}
                            color={'#FFF'}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.lastSubContainer}>
                    <TouchableOpacity onPress={() => { navigation.navigate('NewMessageScreen') }}>
                        <Feather
                            name='edit'
                            color={'white'}
                            size={25}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.bodyContainer}>
                <FlatList
                    data={filteredData}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <>
                            <TouchableOpacity style={styles.inputContainer}>
                                <LinearGradient
                                    colors={['#b09752ff', '#be6018ff', '#a01d58ff', '#6c218aff', '#5561e5ff']}
                                    style={styles.gradientCircle}
                                >
                                    <Entypo name="instagram-with-circle" size={20} color="#333" />
                                </LinearGradient>
                                <TextInput
                                    style={{ width: '100%', fontSize: 16, color: '#fff' }}
                                    placeholder="Ask Meta AI or Search"
                                    placeholderTextColor="#ddd"
                                    value={searchText}
                                    onChangeText={(text) => setSearchText(text)}
                                />
                            </TouchableOpacity>

                            <OnlinePeopleView />

                            <View style={styles.messageHeader}>
                                <View>
                                    <Text style={styles.headerTxt}>Message</Text>
                                </View>
                                <TouchableOpacity>
                                    <Text style={[styles.headerTxt, { color: '#8d89ffff' }]}>Requests</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    }
                    renderItem={({ item }) => (
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10, paddingHorizontal: 15 }} onPress={() => navigation.navigate('ChatScreen', { item: item })}>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => { navigation.navigate('ChatScreen', { item: item }) }}>
                                {
                                    item.hasStory ?
                                        <LinearGradient
                                            colors={['#e1c16bff', '#ec7921ff', '#d62b78ff', '#9e33c8ff']}
                                            style={styles.storyCircle}
                                        >
                                            <Image
                                                source={{ uri: item.profilePic }}
                                                style={{ width: 55, height: 55, borderRadius: 50, borderWidth: 2, borderColor: '#000' }}
                                            />
                                        </LinearGradient>
                                        : <Image
                                            source={{ uri: item.profilePic }}
                                            style={{ width: 55, height: 55, borderRadius: 50, marginRight: 20 }}
                                        />
                                }
                                <TouchableOpacity onPress={() => { navigation.navigate('ChatScreen', { item: item }) }}>
                                    <Text style={{ fontSize: 16, color: '#fff' }}>
                                        {item.username}
                                    </Text>
                                    <Text style={{ fontSize: 14, color: '#ccc' }}>
                                        {item.presence}
                                    </Text>
                                </TouchableOpacity>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => console.log('camera clicked')}>
                                <Ionicons name="camera-outline" size={25} color="#fff" />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </SafeAreaView>
    )
}

export default MessageScreen

const styles = StyleSheet.create({
    SafeAreaViewContainer: {
        flex: 1,
        paddingTop: 35,
        backgroundColor: COLORS.homeScreen.backgroundColor,
    },
    header: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15,
        paddingHorizontal: 18,
    },
    firstSubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    lastSubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 25,
        paddingHorizontal: 2,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginHorizontal: 25,
        paddingHorizontal: 10,
        backgroundColor: '#333',
        borderRadius: 40,
    },
    gradientCircle: {
        width: 25,
        height: 25,
        borderRadius: 17,
        alignItems: 'center',
        justifyContent: 'center',
    },
    messageContainer: {
        // height: 670,
    },
    messageHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginTop: 5,
        marginBottom: 20,
    },
    headerTxt: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff'
    },
    storyCircle: {
        width: 58,
        height: 58,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    bodyContainer: {
        paddingBottom: 70,
    }
})