import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';

const Caption = ({ username, caption }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <View style={styles.container}>
            <Text
                style={styles.caption}
                numberOfLines={expanded ? undefined : 2}
                ellipsizeMode="tail"
            >
                <Text style={styles.username}>{username} </Text>
                {caption}
            </Text>

            {!expanded && caption.length > 80 ? (
                <TouchableOpacity onPress={() => setExpanded(true)}>
                    <Text style={styles.seeMore}>See more</Text>
                </TouchableOpacity>
            ) : caption.length > 80 && expanded && (
                <TouchableOpacity onPress={() => setExpanded(false)}>
                    <Text style={styles.seeMore}>See less</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    caption: {
        color: '#FFFFFF',
    },
    username: {
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    seeMore: {
        color: 'gray',
        marginTop: 3,
    },
});

export default Caption;
