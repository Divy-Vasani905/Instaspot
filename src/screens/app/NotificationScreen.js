import { Image, SafeAreaView, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../../constants/color'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { notifications } from '../../utils/notificationData';
import FollowButton from '../../components/FollowButton';

const createSections = (notifications) => {
    const sections = [
        { title: "Today", data: [] },
        { title: "Last 7 Days", data: [] },
        { title: "Last 30 Days", data: [] },
        { title: "Older", data: [] },
    ];

    notifications.forEach((item) => {
        if (item.time.includes("h")) {
            sections[0].data.push(item);
        } else if (item.time.includes("d")) {
            const days = parseInt(item.time);

            if (days <= 7) {
                sections[1].data.push(item);
            } else if (days <= 30) {
                sections[2].data.push(item);
            } else {
                sections[3].data.push(item);
            }
        }
    });

    return sections;
};

const NotificationScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.SafeAreaViewContainer} edges={['top', 'left', 'right']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <MaterialIcons name='arrow-back' size={30} color={'#fff'} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>
                    Notifications
                </Text>
            </View>
            <View style={styles.container}>
                <SectionList
                    sections={createSections(notifications)}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.sectionHeader}>{title}</Text>
                    )}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <View style={styles.item}>
                                <TouchableOpacity onPress={() => { navigation.navigate('OthersProfileScreen', { item: item }) }}>
                                    <Image
                                        source={{ uri: item.user.profilePic }}
                                        style={styles.avatar}
                                    />
                                </TouchableOpacity>
                                <View style={styles.textContainer}>
                                    <TouchableOpacity onPress={() => { navigation.navigate('OthersProfileScreen', { item: item }) }}>
                                        <Text style={styles.username}>{item.user.username}</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.message}>{item.message}</Text>
                                    <Text style={styles.time}>{item.time}</Text>
                                </View>
                            </View>
                            <View style={styles.iconContainer}>
                                {(item.type === 'like' || item.type === 'comment') ? (
                                    <Image
                                        source={{ uri: item.post.image }}
                                        style={styles.postImage}
                                    />
                                ) : item.type === 'follow' ? (
                                    <FollowButton
                                        followed={false}
                                        notification={true}
                                    />
                                ) : item.type === 'follow_request' ? (
                                    <View style={styles.actions}>
                                        <TouchableOpacity style={styles.acceptBtn}>
                                            <Text style={styles.acceptText}>Accept</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.declineBtn}>
                                            <Text style={styles.declineText}>Decline</Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : null}
                            </View>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    )
}

export default NotificationScreen

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
        gap: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    container: {
        flex: 1,
        paddingHorizontal: 15,
    },
    sectionHeader: {
        fontWeight: "bold",
        fontSize: 18,
        marginTop: 10,
        marginBottom: 5,
        color: "#fff",
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 8,
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        // paddingVertical: 8,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 12,
    },
    textContainer: {
        // flex: 1,
    },
    username: {
        fontWeight: "600",
        fontSize: 16,
        color: "#fff",
    },
    message: {
        fontSize: 14,
        color: "#d2d2d2",
    },
    time: {
        fontSize: 13,
        color: "#888",
        marginTop: 2,
    },
    postImage: {
        width: 48,
        height: 55,
        borderRadius: 8,
    },
    buttonText: {
        width: 125,
        fontSize: 14,
        fontWeight: '500',
        textAlign: "center",
        color: "#FFF",
        backgroundColor: '#34343aff',
        paddingVertical: 8,
        borderRadius: 5,
    },
    actions: {
        flexDirection: "row",
        marginLeft: "auto",
        gap: 8,
    },
    acceptBtn: {
        backgroundColor: "#3c49ffff",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    acceptText: {
        color: "#fff",
        fontWeight: "600",
    },
    declineBtn: {
        backgroundColor: "#555",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    declineText: {
        color: "#fff",
        fontWeight: "600",
    },
});