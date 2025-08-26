import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import PostCard from './PostCard';

import { posts } from '../utils/postData';
import { COLORS } from '../constants/color';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const PostsView = ({ route }) => {
    const navigation = useNavigation();
    const flatListRef = useRef(null);
    const { focusId } = route.params;

    useEffect(() => {
        if (focusId && posts.length > 0) {
            const index = posts.findIndex(post => post.id === focusId);
            console.log(typeof focusId, typeof index)
            console.log(focusId, index)
            if (index !== -1 && flatListRef.current) {
                setTimeout(() => {
                    flatListRef.current.scrollToIndex({
                        index,
                        animated: false,
                        viewPosition: 0,
                    });
                }, 180);
            }
        }
    }, [focusId]);

    return (
        <SafeAreaView style={styles.SafeAreaViewContainer} edges={['top', 'left', 'right']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <MaterialIcons name='arrow-back' size={30} color={'#fff'} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>
                    Posts
                </Text>
            </View>
            <FlatList
                ref={flatListRef}
                data={posts}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <PostCard item={item} />}
            />
        </SafeAreaView>
    );
};

export default PostsView;

const styles = StyleSheet.create({
    SafeAreaViewContainer: {
        flex: 1,
        paddingTop: 35,
        backgroundColor: COLORS.homeScreen.backgroundColor,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginVertical: 15,
        gap: 20
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    }
});
