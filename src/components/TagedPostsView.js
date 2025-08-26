import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import TagsViewCards from './TagsViewCards';

import { taggedData } from '../utils/taggedData';
import { COLORS } from '../constants/color';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const TagedPostsView = ({ route }) => {
    const navigation = useNavigation();
    const flatListRef = useRef(null);
    const { focusId } = route.params;

    useEffect(() => {
        if (focusId && taggedData.length > 0) {
            const index = taggedData.findIndex(item => item.id === focusId);
            if (index !== -1 && flatListRef.current) {
                setTimeout(() => {
                    flatListRef.current.scrollToIndex({
                        index,
                        animated: false,
                        viewPosition: 0,
                    });
                }, 0);
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
                data={taggedData}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <TagsViewCards item={item} />}
            />
        </SafeAreaView>
    );
};

export default TagedPostsView;

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
