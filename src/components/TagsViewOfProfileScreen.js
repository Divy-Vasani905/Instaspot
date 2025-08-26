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

const { width } = Dimensions.get('window');
const IMAGE_SIZE = width / 3;

import copy from '../assets/image/copy-icon/copy.png'
import reel from '../assets/image/video-play-icon/reel-fill.png'
import { useNavigation } from '@react-navigation/native';
import { taggedData } from '../utils/taggedData';
import Video from 'react-native-video';
import VideoThumbnail from './VideoThumbnail';

const TagsViewOfProfileScreen = () => {
    const navigation = useNavigation();

    const dummyData = Array.from({ length: 5 }, (_, i) => ({
        id: String(i + 1),
        uri: `https://picsum.photos/300?random=${i}`,
    }));

    if (dummyData.length < 1) {
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
            data={taggedData}
            keyExtractor={item => item.id}
            numColumns={3}
            contentContainerStyle={{ backgroundColor: '#000' }}
            renderItem={({ item }) => (
                <View style={{ backgroundColor: '#000' }}>
                    <TouchableOpacity onPress={() => { navigation.navigate('TagedPostsView', { focusId: item.id }); }}>
                        {
                            item.type === 'post' ? (
                                <Image source={{ uri: item.mediaUrl }} style={styles.image} />
                            ) : (
                                <VideoThumbnail videoUrl={item.videoUrl} IMAGE_SIZE={IMAGE_SIZE} />
                            )
                        }
                    </TouchableOpacity>
                    <Image
                        source={item.type === 'post' ? copy : reel}
                        style={styles.TagImage}
                        resizeMode='contain'
                    />
                </View>
            )}
            showsVerticalScrollIndicator={false}
        />
    );
};

export default TagsViewOfProfileScreen;

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
    TagImage: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 25,
        height: 22,
        margin: 1,
    },
});
