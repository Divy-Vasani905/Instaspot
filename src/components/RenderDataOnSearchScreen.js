import React from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Image,
    Dimensions,
    Text,
} from 'react-native';

const { width } = Dimensions.get('window');
const SMALL_SIZE = width / 3;
const BIG_WIDTH = width / 3;
const BIG_HEIGHT = SMALL_SIZE * 2 + 4;

import Entypo from 'react-native-vector-icons/Entypo';

const RenderDataOnSearchScreen = ({ filteredData, searching }) => {
    const createLayoutData = (data) => {
        const layout = [];
        for (let i = 0; i < data.length; i += 5) {
            const chunk = data.slice(i, i + 5);
            if (chunk.length === 5) {
                layout.push(chunk);
            }
        }
        return layout;
    };

    const groupedData = createLayoutData(filteredData);

    return (
        <>
            {searching ? filteredData.length > 0 && (
                <FlatList
                    data={filteredData}
                    keyExtractor={(_, idx) => idx.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, paddingHorizontal: 10 }}>
                                <View>
                                    <Image source={{ uri: item.profilePic }} style={{ width: 50, height: 50, borderRadius: 50, marginRight: 10 }} />
                                </View>
                                <View>
                                    <Text style={{ color: '#fff' }}>
                                        {item.username}
                                    </Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ color: '#bbb' }}>{item.name}</Text>
                                        <Entypo name="dot-single" size={20} color="#bbb" />
                                        <Text style={{ color: '#bbb', fontSize: 12 }}>
                                            Followed by {(item.followedBy?.slice(0, 1) || []).join(', ')}
                                            {item.followedBy && item.followedBy.length > 1
                                                ? ` + ${item.followedBy.length - 1} more`
                                                : ''}
                                        </Text>
                                    </View>
                                </View>
                            </View >
                        );
                    }}
                    showsVerticalScrollIndicator={false}
                />
            ) : filteredData.length > 0 && (
                <FlatList
                    data={groupedData}
                    keyExtractor={(_, idx) => idx.toString()}
                    renderItem={({ item, index }) => {
                        const bigOnRight = index % 2 === 0;

                        return (
                            <View style={styles.row}>
                                {bigOnRight ? (
                                    <>
                                        <View style={styles.smallContainer}>
                                            <View style={styles.smallRow}>
                                                <Image source={{ uri: item[0].uri }} style={styles.smallImage} />
                                                <Image source={{ uri: item[1].uri }} style={styles.smallImage} />
                                            </View>
                                            <View style={styles.smallRow}>
                                                <Image source={{ uri: item[2].uri }} style={styles.smallImage} />
                                                <Image source={{ uri: item[3].uri }} style={styles.smallImage} />
                                            </View>
                                        </View>
                                        <Image source={{ uri: item[4].uri }} style={styles.bigImage} />
                                    </>
                                ) : (
                                    <>
                                        <Image source={{ uri: item[4].uri }} style={styles.bigImage} />
                                        <View style={styles.smallContainer}>
                                            <View style={styles.smallRow}>
                                                <Image source={{ uri: item[0].uri }} style={styles.smallImage} />
                                                <Image source={{ uri: item[1].uri }} style={styles.smallImage} />
                                            </View>
                                            <View style={styles.smallRow}>
                                                <Image source={{ uri: item[2].uri }} style={styles.smallImage} />
                                                <Image source={{ uri: item[3].uri }} style={styles.smallImage} />
                                            </View>
                                        </View>
                                    </>
                                )}
                            </View>
                        );
                    }}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </>
    )
}

export default RenderDataOnSearchScreen

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginBottom: 2,
    },
    smallContainer: {
        flexDirection: 'column',
        flex: 2,
    },
    smallRow: {
        flexDirection: 'row',
    },
    smallImage: {
        width: SMALL_SIZE,
        height: SMALL_SIZE,
        margin: 1,
    },
    bigImage: {
        width: BIG_WIDTH,
        height: BIG_HEIGHT,
        margin: 1,
    },
})