import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { createThumbnail } from 'react-native-create-thumbnail';

const VideoThumbnail = ({ videoUrl, IMAGE_SIZE }) => {
    const [thumbnail, setThumbnail] = useState(null);

    useEffect(() => {
        createThumbnail({
            url: videoUrl,
            timeStamp: 1000,
        })
            .then(response => setThumbnail(response.path))
            .catch(err => console.log({ err }));
    }, [videoUrl]);

    return (
        <View>
            {thumbnail && (
                <Image
                    source={{ uri: thumbnail }}
                    style={[styles.image, { width: IMAGE_SIZE, height: 200 }]}
                />
            )}
        </View>
    );
};

export default VideoThumbnail;

const styles = StyleSheet.create({
    image: {
        margin: 1,
        backgroundColor: '#000'
    },
});
