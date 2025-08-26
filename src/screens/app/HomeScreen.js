import React from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, Text } from 'react-native';

import HeaderOfHomeScreen from '../../components/HeaderOfHomeScreen';
import StoryCard from '../../components/StoryCard';
import PostCard from '../../components/PostCard';

import { COLORS } from '../../constants/color';
import { posts } from '../../utils/postData';

const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.SafeAreaViewContainer} edges={['top', 'left', 'right']}>
            <View style={styles.container}>
                <FlatList
                    data={posts}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <>
                            <HeaderOfHomeScreen />
                            <StoryCard navigation={navigation} />
                        </>
                    }
                    renderItem={({ item }) => (
                        <PostCard item={item} />
                    )}
                />
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    SafeAreaViewContainer: {
        flex: 1,
        paddingTop: 35,
        backgroundColor: COLORS.homeScreen.backgroundColor,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.homeScreen.backgroundColor,
    },
});
