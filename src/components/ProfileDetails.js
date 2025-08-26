import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Entypo';

import invite from '../assets/image/invite-icon/invite.png'
import FollowButton from './FollowButton';

const ProfileDetails = ({ userData = {} }) => {
    const navigation = useNavigation();
    const [isFollowed, setIsFollowed] = useState(false)
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                        <Image
                            style={{ height: 85, width: 85, borderRadius: 50 }}
                            source={{ uri: userData?.profilePic || 'https://randomuser.me/api/portraits/men/1.jpg' }}
                        />
                        <View style={styles.addIconContainer}>
                            <Icon name="plus" size={20} color="#000000" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ width: 285, justifyContent: 'space-between' }}>
                    <Text style={styles.Title}>
                        {userData?.name || 'Divy Vasani'}
                    </Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <View style={{ width: 60 }}>
                            <Text style={styles.detailText}>5</Text>
                            <Text style={styles.detailText}>posts</Text>
                        </View>

                        <View style={{ width: 85 }}>
                            <Text style={styles.detailText}>200</Text>
                            <Text style={styles.detailText}>followers</Text>
                        </View>

                        <View style={{ width: 85 }}>
                            <Text style={styles.detailText}>321</Text>
                            <Text style={styles.detailText}>following</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View>
                <Text style={styles.bioText}>
                    I ❤️ My Self
                </Text>

                <View style={styles.subContainer}>
                    {
                        Object.keys(userData).length === 0 ? <>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('EditProfileScreen')}
                            >
                                <Text style={styles.buttonText}>
                                    Edit profile
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('ShareProfileScreen')}
                            >
                                <Text style={styles.buttonText}>
                                    Share profile
                                </Text>
                            </TouchableOpacity>
                        </> : <>
                            <FollowButton followed={false} />

                            <TouchableOpacity
                                onPress={() => navigation.navigate('MessageScreen')}
                            >
                                <Text style={styles.buttonText}>
                                    Message
                                </Text>
                            </TouchableOpacity>
                        </>
                    }
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ShareProfile')}
                        style={styles.inviteButton}
                    >
                        <Image
                            source={invite}
                            style={styles.inviteIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ProfileDetails

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        paddingHorizontal: 18,
        paddingVertical: 5,
    },
    Title: {
        fontSize: 14,
        fontWeight: '500',
        color: '#FFFFFF',
    },
    addIconContainer: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        backgroundColor: '#FFFFFF',
        borderRadius: 60,
    },
    detailText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#FFFFFF',
    },
    bioText: {
        fontSize: 15,
        color: "#FFFFFF",
        fontWeight: '400',
        marginTop: 10,
    },
    subContainer: {
        flexDirection: "row",
        marginTop: 15,
        justifyContent: "space-between",
        gap: 5,
    },
    buttonText: {
        width: 175,
        fontSize: 14,
        fontWeight: '500',
        textAlign: "center",
        color: "#FFF",
        backgroundColor: '#34343aff',
        paddingVertical: 8,
        borderRadius: 5,
    },
    inviteButton: {
        width: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#34343aff',
        paddingVertical: 8,
        borderRadius: 5,
    },
    inviteIcon: {
        height: 18,
        width: 18,
        color: "#FFF",
    }
})