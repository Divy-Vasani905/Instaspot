import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Image,
    Dimensions,
    Text,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';

const { width } = Dimensions.get('window');
const SMALL_SIZE = width / 3;
const BIG_WIDTH = width / 3;
const BIG_HEIGHT = SMALL_SIZE * 2 + 4;

const ITEMS_PER_PAGE = 3;

const RenderDataOnSearchScreen = ({ filteredData, searching }) => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [visibleData, setVisibleData] = useState([]);

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

    useEffect(() => {
        if (searching) {
            setVisibleData(filteredData.slice(0, ITEMS_PER_PAGE));
        } else {
            setVisibleData(groupedData.slice(0, ITEMS_PER_PAGE));
        }
    }, [filteredData, searching]);

    const loadMore = () => {
        if (loading) return;
        if (visibleData.length >= (searching ? filteredData.length : groupedData.length)) return;
        setLoading(true);

        setTimeout(() => {
            if (searching) {
                const start = visibleData.length;
                const nextBatch = filteredData.slice(start, start + ITEMS_PER_PAGE);
                setVisibleData((prev) => [...prev, ...nextBatch]);
            } else {
                const start = visibleData.length;
                const nextBatch = groupedData.slice(start, start + ITEMS_PER_PAGE);
                setVisibleData((prev) => [...prev, ...nextBatch]);
            }
            setLoading(false);
        }, 500);
    };

    const renderFooter = () => {
        if (!loading) return null;
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        );
    };

    return (
        <>
            {searching ? visibleData.length > 0 && (
                <FlatList
                    data={visibleData}
                    keyExtractor={(_, idx) => idx.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.searchRow}
                            onPress={() => navigation.navigate('OthersProfileScreen', { item })}
                        >
                            <Image
                                source={{ uri: item.profilePic }}
                                style={styles.avatar}
                            />
                            <View>
                                <Text style={{ color: '#fff' }}>{item.username}</Text>
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
                        </TouchableOpacity>
                    )}
                    showsVerticalScrollIndicator={false}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={renderFooter}
                />
            ) : visibleData.length > 0 && (
                <FlashList
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
                                                <TouchableOpacity>
                                                    <Image source={{ uri: item[0].uri }} style={styles.smallImage} />
                                                </TouchableOpacity>
                                                <TouchableOpacity>
                                                    <Image source={{ uri: item[1].uri }} style={styles.smallImage} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={styles.smallRow}>
                                                <TouchableOpacity>
                                                    <Image source={{ uri: item[2].uri }} style={styles.smallImage} />
                                                </TouchableOpacity>
                                                <TouchableOpacity>
                                                    <Image source={{ uri: item[3].uri }} style={styles.smallImage} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <TouchableOpacity>
                                            <Image source={{ uri: item[4].uri }} style={styles.bigImage} />
                                        </TouchableOpacity>
                                    </>
                                ) : (
                                    <>
                                        <TouchableOpacity>
                                            <Image source={{ uri: item[4].uri }} style={styles.bigImage} />
                                        </TouchableOpacity>
                                        <View style={styles.smallContainer}>
                                            <View style={styles.smallRow}>
                                                <TouchableOpacity>
                                                    <Image source={{ uri: item[0].uri }} style={styles.smallImage} />
                                                </TouchableOpacity>
                                                <TouchableOpacity>
                                                    <Image source={{ uri: item[1].uri }} style={styles.smallImage} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={styles.smallRow}>
                                                <TouchableOpacity>
                                                    <Image source={{ uri: item[2].uri }} style={styles.smallImage} />
                                                </TouchableOpacity>
                                                <TouchableOpacity>
                                                    <Image source={{ uri: item[3].uri }} style={styles.smallImage} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </>
                                )}
                            </View>
                        );
                    }}
                    showsVerticalScrollIndicator={false}
                    // onEndReached={loadMore}
                    // onEndReachedThreshold={0.5}
                    // ListFooterComponent={renderFooter}
                    contentContainerStyle={{ paddingBottom: 50 }}
                    estimatedItemSize={350}
                />

            )}
        </>
    );
};

export default RenderDataOnSearchScreen;

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
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 10,
    },
    loader: {
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 30,
        alignItems: 'center',
    },
});