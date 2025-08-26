import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import Feather from 'react-native-vector-icons/Feather';
import { HighlightsData } from '../utils/highlightData';
import { useNavigation } from '@react-navigation/native';

const Highlight = ({ otherUser = false }) => {
    const navigation = useNavigation();

    return (
        <FlatList
            data={HighlightsData}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.container}
            ListHeaderComponent={() => (
                !otherUser && <TouchableOpacity style={styles.storyItem} >
                    <View style={styles.newCircle}>
                        <Feather name="plus" size={30} color="#FFFFFF" style={styles.newIcon} />
                    </View>
                    <Text style={styles.name} numberOfLines={1}>
                        New
                    </Text>
                </TouchableOpacity>
            )}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.storyItem} onPress={() => { navigation.navigate('StoryScreen', { id: item.id, name: item.name, profilePic: item.profilePic }) }}>
                    <View style={styles.storyCircle}>
                        <Image
                            source={{ uri: item.profilePic }}
                            style={styles.storyImage}
                            resizeMode='contain'
                        />
                    </View>
                    <Text style={styles.name} numberOfLines={1}>
                        {item.isUser ? 'Your Story' : item.name}
                    </Text>
                </TouchableOpacity>
            )}
        />
    )
}

export default Highlight

const styles = StyleSheet.create({
    container: {
        height: 100,
        paddingHorizontal: 8,
        marginVertical: 15,
    },
    storyItem: {
        alignItems: 'center',
        marginRight: 12,
    },
    storyCircle: {
        borderRadius: 50,
        padding: 2,
    },
    newCircle: {
        width: 75,
        height: 75,
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    newIcon: {
        width: 70,
        height: 70,
        borderRadius: 60,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    storyImage: {
        width: 70,
        height: 70,
        borderRadius: 60,
    },
    name: {
        fontSize: 13,
        color: '#fff',
        marginTop: 3,
        width: 70,
        textAlign: 'center',
    },
})