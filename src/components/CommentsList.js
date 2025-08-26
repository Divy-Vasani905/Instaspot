import React, { useRef, useState } from "react";
import { FlatList, View, Text, Image, TouchableOpacity, StyleSheet, Animated, TextInput } from "react-native";
import { commentsData } from "../utils/commentsData";
import { COLORS } from "../constants/color";

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CommentItem = ({ item }) => {
    const [showReplies, setShowReplies] = useState(false);

    const [likes, setLikes] = useState(item.likes);
    const [isLiked, setIsLiked] = useState(item.isLiked);
    const scaleLikeAnim = useRef(new Animated.Value(1)).current;
    const handleLike = () => {
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
        if (isLiked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setIsLiked(!isLiked);
    };

    return (
        <View style={{ marginVertical: 8 }}>
            <View style={{ flexDirection: "row", marginBottom: 4 }}>
                <View style={{ flexDirection: "row", flex: 1 }}>
                    <Image
                        source={{ uri: item.profileImage }}
                        style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
                    />
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontWeight: "600", color: "#fff" }}>
                            {item.username} <Text style={{ color: "#999" }}>{item.time}</Text>
                        </Text>
                        <Text style={{ color: "#ddd" }}>{item.text}</Text>
                    </View>
                </View>
                <View>
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
                                    size={15}
                                    color={isLiked
                                        ? 'red'
                                        : '#ccc'
                                    }
                                />
                            </Animated.View>
                        </TouchableOpacity>
                        <Text style={styles.likesTxt}> {likes} </Text>
                    </View>
                </View>
            </View>

            {item.replies.length > 0 && !showReplies && (
                <TouchableOpacity onPress={() => setShowReplies(true)} style={{ marginLeft: 50 }}>
                    <Text style={{ color: "#999", fontSize: 13 }}>View {item.replies.length} replies</Text>
                </TouchableOpacity>
            )}

            {showReplies && (
                <FlatList
                    data={item.replies}
                    keyExtractor={(reply) => reply.id}
                    scrollEnabled={false}
                    renderItem={({ item: reply }) => (
                        <>
                            <View style={{ flexDirection: "row", marginVertical: 6, marginLeft: 50 }}>
                                <View style={{ flexDirection: "row", marginVertical: 4, flex: 1 }}>
                                    <Image
                                        source={{ uri: reply.profileImage }}
                                        style={{ width: 30, height: 30, borderRadius: 15, marginRight: 10 }}
                                    />
                                    <View>
                                        <Text style={{ fontWeight: "bold", color: "#fff" }}>{reply.username}</Text>
                                        <Text style={{ color: "#ddd" }}>{reply.text}</Text>
                                    </View>
                                </View>
                                <View>
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
                                                    name={false ? "heart" : "heart-o"}
                                                    size={15}
                                                    color={isLiked
                                                        ? 'red'
                                                        : '#ccc'
                                                    }
                                                />
                                            </Animated.View>
                                        </TouchableOpacity>
                                        <Text style={styles.likesTxt}> {likes} </Text>
                                    </View>
                                </View>
                            </View>
                        </>
                    )}
                />
            )}
            {item.replies.length > 0 && showReplies && (
                <TouchableOpacity onPress={() => setShowReplies(false)} style={{ marginLeft: 50 }}>
                    <Text style={{ color: "#999", fontSize: 13 }}>Hide replies</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default function CommentsList() {

    const [commentInput, setCommentInput] = useState("");
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={commentsData}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <CommentItem item={item} />}
                contentContainerStyle={{ paddingBottom: 50 }}
            />
            <View style={styles.inputBar}>
                <TextInput
                    value={commentInput}
                    onChangeText={setCommentInput}
                    placeholder="Add a comment..."
                    placeholderTextColor="#888"
                    style={styles.input}
                />
                <TouchableOpacity
                    onPress={() => {
                        if (commentInput.trim()) {
                            console.log("Post:", commentInput);
                            setCommentInput("");
                        }
                    }}
                    style={styles.postBtn}
                >
                    <Text style={{ color: "#0af", fontWeight: "bold" }}>Post</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    likes: {
        alignItems: 'center',
        paddingVertical: 7,
    },
    likesTxt: {
        fontSize: 11,
        fontWeight: '500',
        color: COLORS.homeScreen.textColor,
    },
    inputBar: {
        flexDirection: "row",
        padding: 10,
        borderTopWidth: 0.5,
        borderColor: "#444",
        backgroundColor: "#222",
    },
    input: {
        flex: 1,
        backgroundColor: "#333",
        color: "#fff",
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
    postBtn: {
        marginLeft: 10,
        justifyContent: "center",
    },
})
