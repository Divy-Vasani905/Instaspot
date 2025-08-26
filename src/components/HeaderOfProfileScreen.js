import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'

import threads from '../assets/image/threads-logo/threads.png'
import { useNavigation } from '@react-navigation/native'

const HeaderOfProfileScreen = ({ username = '' }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.firstSubContainer}>
                {
                    username !== '' &&
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 10 }}>
                        <MaterialIcons name='arrow-back' size={30} color={'#fff'} />
                    </TouchableOpacity>
                }
                <Text style={styles.Title}>{username ? username : 'divy_vasani'}</Text>
                <TouchableOpacity>
                    {
                        username === '' && <Octicons
                            name='chevron-down'
                            size={20}
                            color={'#FFF'}
                        />
                    }
                </TouchableOpacity>
            </View>
            <View style={styles.lastSubContainer}>
                {
                    username === '' ? <>
                        <TouchableOpacity>
                            <Image
                                source={threads}
                                style={styles.threads}
                                resizeMode='contain'
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <FontAwesome
                                name='plus-square-o'
                                color={'white'}
                                size={30}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Octicons
                                name='three-bars'
                                size={29}
                                color={'#FFF'}
                            />
                        </TouchableOpacity>
                    </> : <TouchableOpacity onPress={() => { }}>
                        <Entypo
                            name='dots-three-vertical'
                            color={'white'}
                            size={20}
                        />
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

export default HeaderOfProfileScreen

const styles = StyleSheet.create({
    container: {
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
    Title: {
        fontSize: 26,
        fontWeight: '600',
        color: '#FFF',
    },
    lastSubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 2,
        gap: 25,
    },
    threads: {
        height: 26,
        width: 26,
        borderRadius: 15,
    }
})