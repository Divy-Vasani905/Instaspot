import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Video from 'react-native-video'

import Icon from "react-native-vector-icons/Entypo";
import { COLORS } from '../constants/color';
import { stories } from '../utils/storyData';

const { width } = Dimensions.get("window");
const StoryViewCard = ({ navigation, id }) => {
    const videoRef = useRef(null);
    const [progress, setProgress] = useState(0);

    const [userId, setUserId] = useState(id)
    const [storyUser, setStoryUser] = useState({})

    useEffect(() => {
        const foundStory = stories.find((story) => story.id === userId);
        if (foundStory) {
            setStoryUser(foundStory);
            setProgress(0);
        } else {
            navigation.goBack();
        }
    }, [userId, navigation])

    const handleNext = () => {
        if (userId < stories.length) {
            setUserId(userId + 1);
        }
    };

    const handlePrev = () => {
        if (userId > 0) {
            setUserId(userId - 1);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
            </View>

            <Video
                ref={videoRef}
                source={{ uri: storyUser.mediaUrl }}
                style={styles.video}
                resizeMode="contain"
                onProgress={(data) => setProgress(data.currentTime / data.seekableDuration)}
                onEnd={() => setUserId(userId + 1)}
                repeat={false}
            />

            <View style={styles.touchZones}>
                <TouchableOpacity style={styles.leftZone} onPress={handlePrev} />
                <TouchableOpacity style={styles.rightZone} onPress={handleNext} />
            </View>

            <View style={styles.topOverlay}>
                <TouchableOpacity onPress={() => { navigation.navigate('OthersProfileScreen', { item: storyUser }) }}>
                    <View style={styles.userInfo}>
                        <Image
                            source={{ uri: storyUser.profilePic }}
                            style={styles.profilePic}
                        />
                        <Text style={styles.username}>
                            {storyUser.username}
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { }}>
                    <Icon name="dots-three-vertical" size={20} color={COLORS.homeScreen.textColor} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default StoryViewCard

const styles = StyleSheet.create({
    container: {
        flex: 0.9,
        backgroundColor: 'rgba(255,255,255,0.3)'
    },
    video: {
        position: "absolute",
        top: 0,
        left: 0,
        width: width,
        height: '100%',
    },
    progressContainer: {
        position: "absolute",
        top: 10,
        left: 10,
        right: 10,
        height: 3,
        backgroundColor: "rgba(255,255,255,0.3)",
        borderRadius: 2,
        zIndex: 10,
    },
    progressBar: {
        height: "50%",
        backgroundColor: "#fff",
        borderRadius: 2,
    },
    touchZones: {
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    leftZone: {
        width: '50%',
        height: '100%',
    },
    rightZone: {
        width: '50%',
        height: '100%',
    },
    topOverlay: {
        position: "absolute",
        top: 20,
        left: 10,
        right: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 5,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    username: {
        fontWeight: 'bold',
        color: COLORS.homeScreen.textColor,
    },
})  