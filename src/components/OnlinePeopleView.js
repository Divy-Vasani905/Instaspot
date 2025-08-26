import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { onlinePeople } from '../utils/onlinePeopleData';

const OnlinePeopleView = () => {
    return (
        <FlatList
            data={onlinePeople}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.mainContainer}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10, paddingHorizontal: 10 }}>
                    <View style={{ alignItems: 'center', textAlign: 'center', }}>
                        <Text numberOfLines={2} style={styles.note}>{item.note}</Text>
                        <Image
                            source={{ uri: item.profilePic }}
                            style={{ width: 70, height: 70, borderRadius: 50, marginRight: 10 }}
                        />
                        <View style={{ position: 'absolute', bottom: 5, right: 10, width: 15, height: 15, borderRadius: 50, backgroundColor: item.isOnline ? 'green' : '' }} />
                    </View>
                    <Text numberOfLines={1} style={styles.name}>{item.name}</Text>
                </View>
            )}
        />
    )
}

export default OnlinePeopleView

const styles = StyleSheet.create({
    mainContainer: {
        height: 100,
        marginTop: 35,
    },
    note: {
        position: 'absolute',
        zIndex: 10,
        top: -30,
        color: '#fff',
        backgroundColor: '#333',
        opacity: 0.8,
        borderRadius: 15,
        padding: 5,
        fontSize: 14,
    },
    name: {
        color: '#fff',
        fontSize: 12,
    },
})