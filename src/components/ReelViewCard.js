import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Video from 'react-native-video';

import { COLORS } from '../constants/color';
import { reelsData } from '../utils/reelData';

import Icon from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import comment from '../assets/image/comment-icon/comment.png';
import repost from '../assets/image/repost-icon/repost.png';
import music from '../assets/image/music-icon/music.png';

import CommentBottomSheet from './CommentBottomSheet';
import ActionBottomSheet from './ActionBottomSheet';
import ShareBottomSheet from './ShareBottomSheet';

import { useIsFocused } from '@react-navigation/native';

const { width } = Dimensions.get("window");
const screenWidth = Dimensions.get('window').width;

const ReelViewCard = ({ navigation, id, isVisible }) => {
    const videoRef = useRef(null);
    const isFocused = useIsFocused();

    const commentRBSheet = useRef();
    const actionRBSheet = useRef();
    const shareRBSheet = useRef();

    const [progress, setProgress] = useState(0);
    const [showFullCaption, setShowFullCaption] = useState(false);

    const [userId, setUserId] = useState(id);
    const [reel, setReel] = useState(reelsData.find((item) => item.id === userId));

    useEffect(() => {
        const foundReel = reelsData.find((item) => item.id === userId);

        if (foundReel) {
            setReel(foundReel);
            setProgress(0);
        } else {
            navigation.goBack();
        }
    }, [userId, navigation])

    useEffect(() => {
        if (!isVisible) {
            videoRef.current?.seek(0)
        }
    }, [isVisible])

    const [likes, setLikes] = useState(reel.likes);
    const [isLiked, setIsLiked] = useState(reel.isLiked);

    const handleLike = () => {
        if (isLiked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setIsLiked(!isLiked);
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <View style={styles.progressContainer}>
                    <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
                </View>

                <Video
                    ref={videoRef}
                    source={{ uri: reel.videoUrl }}
                    style={[styles.video, { width: screenWidth, height: screenWidth / reel.aspectRatio, }]}
                    resizeMode="cover"
                    onProgress={(data) => setProgress(data.currentTime / data.seekableDuration)}
                    repeat
                    paused={!isVisible || !isFocused}
                />

                <View style={styles.bottomOverlay}>
                    <View>
                        <TouchableOpacity onPress={() => { navigation.navigate('OthersProfileScreen', { item: reel }) }}>
                            <View style={styles.userInfo}>
                                <Image
                                    source={{ uri: reel.user.profilePic }}
                                    style={styles.profilePic}
                                />
                                <Text style={styles.username}>
                                    {reel.user.username}
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <View style={styles.captionContainer}>
                            <TouchableOpacity onPress={() => { setShowFullCaption(!showFullCaption) }}>
                                <Text style={styles.captionText} numberOfLines={showFullCaption ? undefined : 1}>
                                    {reel.caption}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.followContainer}>
                            <TouchableOpacity onPress={() => { }}>
                                <Image
                                    source={{ uri: reel.followProfilePic[0] }}
                                    style={styles.followProfilePic}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { }}>
                                <Text style={styles.followText}>
                                    Followed by john_patel and 100 others
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.bottomIcons}>
                    <TouchableOpacity onPress={() => { handleLike() }} style={styles.iconContainer}>
                        <FontAwesome
                            name={isLiked ? "heart" : "heart-o"}
                            size={25}
                            color={isLiked ? 'red' : COLORS.homeScreen.textColor}
                        />
                        <Text style={styles.shareCount}>
                            {
                                likes >= 1000
                                    ? likes >= 1000000
                                        ? `${Math.floor(likes / 1000000)}M`
                                        : `${Math.floor(likes / 1000)}k`
                                    : likes
                            }
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => commentRBSheet.current.open()} style={styles.iconContainer}>
                        <Image source={comment} style={styles.repostIcon} />
                        <Text style={styles.shareCount}>
                            {
                                reel.comments >= 1000
                                    ? reel.comments >= 1000000
                                        ? `${Math.floor(reel.comments / 1000000)}M`
                                        : `${Math.floor(reel.comments / 1000)}k`
                                    : reel.comments
                            }
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => { shareRBSheet.current.open() }}
                        style={styles.iconContainer}
                    >
                        <Image source={repost} style={styles.repostIcon} />
                        <Text style={styles.shareCount}>{reel.reposts}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { shareRBSheet.current.open() }}
                        style={styles.iconContainer}
                    >
                        <Feather name="send" size={25} color={COLORS.homeScreen.textColor} />
                        <Text style={styles.shareCount}>{reel.shareCount}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { actionRBSheet.current.open() }}
                        style={styles.iconContainer}
                    >
                        <Icon name="dots-three-vertical" size={17} color={COLORS.homeScreen.textColor} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { }}
                        style={styles.musicIconContainer}
                    >
                        <Image source={music} style={styles.musicIcon} />
                    </TouchableOpacity>
                </View>
            </View>

            <CommentBottomSheet commentRBSheet={commentRBSheet} />
            <ActionBottomSheet actionRBSheet={actionRBSheet} />
            <ShareBottomSheet shareRBSheet={shareRBSheet} />
        </View>
    )
}

export default ReelViewCard

const styles = StyleSheet.create({
    mainContainer: {
        height: Dimensions.get('window').height,
        width: '100%',
    },
    container: {
        height: Dimensions.get('window').height - 150,
        width: '100%',
    },
    video: {
        position: "absolute",
        top: '50%',
        left: 0,
        transform: [{ translateY: -width / 1.5 }],
        width: width,
        height: '100%',
    },
    progressContainer: {
        position: "absolute",
        bottom: -30,
        left: 0,
        right: 0,
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
    bottomOverlay: {
        position: "absolute",
        bottom: -5,
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
    captionContainer: {
        marginVertical: 7,
        width: '95%',
    },
    captionText: {
        fontSize: 12,
        color: '#fff',
        opacity: 0.99,
    },
    followContainer: {
        width: '95%',
        flexDirection: 'row',
    },
    followProfilePic: {
        width: 15,
        height: 15,
        borderRadius: 20,
        marginRight: 10,
    },
    followText: {
        fontSize: 11,
        color: '#fff',
        opacity: 0.7,
    },
    bottomIcons: {
        position: "absolute",
        bottom: 5,
        right: 10,
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 5,
        gap: 20,
    },
    musicIconContainer: {
        padding: 7,
        borderWidth: 2,
        backgroundColor: '#000',
        borderColor: '#fff',
        borderRadius: 5,
    },
    musicIcon: {
        height: 10,
        width: 10,
    },
    shareCount: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fff',
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
    },
    repostIcon: {
        width: 25,
        height: 25,
    }
})  