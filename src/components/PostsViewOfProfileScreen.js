import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    StyleSheet,
    FlatList,
    Image,
    Dimensions,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import { posts } from '../utils/postData';

const { width } = Dimensions.get('window');
const IMAGE_SIZE = width / 3;

const PostsViewOfProfileScreen = () => {
    const navigation = useNavigation();

    if (posts.length < 1) {
        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>
                    Share a moment with the world
                </Text>
                <TouchableOpacity>
                    <Text style={styles.createText}>
                        Add your first post
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <FlatList
            data={posts}
            keyExtractor={item => item.id}
            numColumns={3}
            contentContainerStyle={{ backgroundColor: '#000' }}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => { navigation.navigate('PostsView', { focusId: item.id }); }}>
                    <Image source={{ uri: item.mediaUrl }} style={styles.image} />
                </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
        />
    );
};

export default PostsViewOfProfileScreen;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
    titleText: {
        fontSize: 20,
        fontWeight: '600',
    },
    createText: {
        color: 'blue',
        fontSize: 16,
        fontWeight: '600',
        marginTop: 10,
    },
    image: {
        width: IMAGE_SIZE,
        height: 200,
        margin: 1,
        backgroundColor: '#000'
    },
});
