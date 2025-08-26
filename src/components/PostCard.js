import React, { useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import comment from '../assets/image/comment-icon/comment.png';
import Caption from './Caption';
import { COLORS } from '../constants/color';
import { useNavigation } from '@react-navigation/native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import CommentBottomSheet from './CommentBottomSheet';
import ActionBottomSheet from './ActionBottomSheet';
import ShareBottomSheet from './ShareBottomSheet';

const screenWidth = Dimensions.get('window').width;

const PostCard = ({ item }) => {
    const navigation = useNavigation();
    const commentRBSheet = useRef();
    const actionRBSheet = useRef();
    const shareRBSheet = useRef();

    const scaleAnim = useRef(new Animated.Value(0)).current;
    const scaleLikeAnim = useRef(new Animated.Value(1)).current;

    const [likes, setLikes] = useState(item.likes);
    const [isLiked, setIsLiked] = useState(item.isLiked);
    const [isBookmarked, setIsBookmarked] = useState(item.isLiked);

    const handleLike = () => {
        console.log("like worked")
        if (isLiked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setIsLiked(!isLiked);
    };

    const handleDoubleTap = () => {
        Animated.sequence([
            Animated.spring(scaleAnim, {
                toValue: 1,
                useNativeDriver: true,
            }),
            Animated.delay(50),
            Animated.spring(scaleAnim, {
                toValue: 0,
                speed: 20,
                bounciness: 10,
                useNativeDriver: true,
            }),
        ]).start();

        if (!isLiked) {
            Animated.sequence([
                Animated.spring(scaleLikeAnim, {
                    toValue: 0,
                    speed: 60,
                    bounciness: 10,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleLikeAnim, {
                    toValue: 1,
                    speed: 100,
                    bounciness: 10,
                    useNativeDriver: true,
                }),
            ]).start();
            setLikes(likes + 1);
            setIsLiked(true)
        }
    }
    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .onStart(() => {
            console.log('Double tap detected!');
            handleDoubleTap();
        });

    return (
        <>
            <View style={styles.card}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => { navigation.navigate('OthersProfileScreen', { item: item }) }}>
                        <View style={styles.userInfo}>
                            <Image source={{ uri: item.user.profilePic }} style={styles.profilePic} />
                            <Text style={styles.username}>{item.user.username}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { actionRBSheet.current.open() }}>
                        <Entypo name="dots-three-vertical" size={20} color={COLORS.homeScreen.textColor} />
                    </TouchableOpacity>
                </View>

                <View>
                    <Image
                        source={{ uri: item.mediaUrl }}
                        style={{
                            width: screenWidth,
                            height: screenWidth / item.aspectRatio,
                        }}
                    />
                    <Animated.View
                        style={[
                            styles.likeIconContainer,
                            {
                                transform: [{ scale: scaleAnim }],
                                opacity: scaleAnim,
                            },
                        ]}
                    >
                        <FontAwesome name="heart" size={100} color="white" />
                    </Animated.View>
                </View>

                {/* <GestureDetector gesture={doubleTap}>
                    <View>
                        <Image
                            source={{ uri: item.mediaUrl }}
                            style={{
                                width: screenWidth,
                                height: screenWidth / item.aspectRatio,
                            }}
                        />
                        <Animated.View
                            style={[
                                styles.likeIconContainer,
                                {
                                    transform: [{ scale: scaleAnim }],
                                    opacity: scaleAnim,
                                },
                            ]}
                        >
                            <FontAwesome name="heart" size={100} color="white" />
                        </Animated.View>
                    </View>
                </GestureDetector> */}

                <View style={styles.footer}>
                    <View style={styles.subFooterContainer}>
                        <View style={styles.likes}>
                            <TouchableOpacity onPress={() => handleLike()}>
                                <Animated.View
                                    style={[
                                        {
                                            transform: [{ scale: scaleLikeAnim }],
                                            opacity: scaleLikeAnim,
                                        },
                                    ]}
                                >
                                    <FontAwesome
                                        name={isLiked ? "heart" : "heart-o"}
                                        size={24}
                                        color={isLiked
                                            ? COLORS.homeScreen.post.like.liked
                                            : COLORS.homeScreen.post.like.unliked
                                        }
                                    />
                                </Animated.View>
                            </TouchableOpacity>
                            <Text style={styles.likesTxt}> {likes} </Text>
                        </View>
                        <View style={styles.likes}>
                            <TouchableOpacity onPress={() => commentRBSheet.current.open()}>
                                <Image source={comment} style={styles.commentIcon} />
                            </TouchableOpacity>
                            <Text style={styles.likesTxt}> {item.comments.length} </Text>
                        </View>
                        <View style={styles.likes}>
                            <TouchableOpacity onPress={() => shareRBSheet.current.open()}>
                                <Feather name="send" size={24} color={COLORS.homeScreen.textColor} />
                            </TouchableOpacity>
                            <Text style={styles.likesTxt}> {item?.sharedCount} </Text>
                        </View>
                    </View>
                    <View style={styles.subFooterContainer}>
                        <View style={styles.likes}>
                            <TouchableOpacity onPress={() => setIsBookmarked(!isBookmarked)}>
                                <MaterialIcons name={isBookmarked ? "bookmark" : "bookmark-outline"} size={24} color={COLORS.homeScreen.textColor} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <Caption username={item.user.username} caption={item.caption} />

                <Text style={styles.time}>{item.timeAgo}</Text>
            </View>

            <CommentBottomSheet commentRBSheet={commentRBSheet} />
            <ActionBottomSheet actionRBSheet={actionRBSheet} />
            <ShareBottomSheet shareRBSheet={shareRBSheet} />
        </>
    );
};

export default PostCard;

const styles = StyleSheet.create({
    card: {
        marginBottom: 20,
        backgroundColor: COLORS.homeScreen.backgroundColor,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
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
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8,
        marginHorizontal: 5,
    },
    subFooterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    likes: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    likesTxt: {
        fontWeight: '600',
        color: COLORS.homeScreen.textColor,
    },
    commentIcon: {
        width: 25,
        height: 25,
    },
    time: {
        paddingHorizontal: 10,
        color: 'gray',
        fontSize: 12,
    },
    likeIconContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -50,
        marginTop: -50,
    },
});
