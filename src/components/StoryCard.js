import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { stories } from '../utils/storyData';
import Icon from 'react-native-vector-icons/Entypo';

const StoryCard = ({ navigation }) => {
    return (
        <FlatList
            data={stories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.container}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.storyItem} onPress={() => { navigation.navigate('StoryScreen', { id: item.id, username: item.username, profilePic: item.profilePic }) }}>
                    <View style={item.isUser ? styles.userStoryCircle : styles.storyCircle}>
                        <Image source={{ uri: item.profilePic }} style={styles.storyImage} />
                        {item.isUser && (
                            <TouchableOpacity
                                style={styles.addIconContainer}
                                onPress={() => { navigation.navigate('NewActivityScreen', { activeFor: 'Story' }) }}
                            >
                                <Icon name="plus" size={20} color="#000000" />
                            </TouchableOpacity>
                        )}
                    </View>
                    <Text style={styles.username} numberOfLines={1}>
                        {item.isUser ? 'Your Story' : item.username}
                    </Text>
                </TouchableOpacity>
            )}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8,
    },
    storyItem: {
        alignItems: 'center',
        marginRight: 12,
    },
    storyCircle: {
        borderWidth: 2,
        borderColor: '#ff8501',
        borderRadius: 50,
        padding: 2,
    },
    userStoryCircle: {
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 50,
        padding: 2,
    },
    storyImage: {
        width: 90,
        height: 90,
        borderRadius: 60,
    },
    addIconContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        borderRadius: 60,
        padding: 1,
        borderWidth: 2,
        // borderColor: '#fff',
    },
    username: {
        fontSize: 13,
        color: '#fff',
        marginTop: 4,
        width: 80,
        textAlign: 'center',
    },
});

export default StoryCard;
