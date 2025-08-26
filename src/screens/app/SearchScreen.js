import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native';

import { COLORS } from '../../constants/color';
import RenderDataOnSearchScreen from '../../components/RenderDataOnSearchScreen';
import InputOfSearchScreen from '../../components/InputOfSearchScreen';

import { usersData } from '../../utils/usersData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome'

const SearchScreen = () => {
    const [searchText, setSearchText] = useState('');
    const [searching, setSearching] = useState(false);
    const dummyData = Array.from({ length: 80 }, (_, i) => ({
        id: String(i + 1),
        uri: `https://picsum.photos/300?random=${i}`,
    }));
    const [filteredData, setFilteredData] = useState(dummyData)

    useEffect(() => {
        if (searching) {
            if (searchText === '') {
                setFilteredData([])
            } else {
                const filteredData = usersData.filter(item =>
                    item.username.toLowerCase().includes(searchText.toLowerCase()) ||
                    item.name.toLowerCase().includes(searchText.toLowerCase())
                );

                setFilteredData(filteredData)
            }
        } else {
            const filteredData = dummyData.filter(item =>
                item.uri.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredData(filteredData)
        }

    }, [searching, searchText])


    return (
        <SafeAreaView style={styles.SafeAreaViewContainer} edges={['top', 'left', 'right']}>
            <View style={styles.container}>
                {searching ?
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                        <TouchableOpacity
                            style={{ alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => { setSearching(false) }}
                        >
                            <MaterialIcons name='arrow-back' size={30} color={'#fff'} />
                        </TouchableOpacity>
                        <InputOfSearchScreen searchText={searchText} setSearchText={setSearchText} />
                    </View>
                    : <TouchableOpacity
                        style={{ marginBottom: 10 }}
                        onPress={() => { setSearching(true) }}
                    >
                        <View style={styles.subContainer}>
                            <Icon name="search" size={22} color={COLORS.searchScreen.textColor} />
                            <Text style={styles.searchInput}>Search</Text>
                        </View>
                    </TouchableOpacity>
                }

                <RenderDataOnSearchScreen filteredData={filteredData} searching={searching} />
            </View>
        </SafeAreaView >
    );
}

export default SearchScreen

const styles = StyleSheet.create({
    SafeAreaViewContainer: {
        flex: 1,
        paddingTop: 35,
        backgroundColor: COLORS.searchScreen.backgroundColor,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.searchScreen.backgroundColor,
    },
    subContainer: {
        flexDirection: 'row',
        backgroundColor: '#212121ff',
        alignItems: 'center',
        borderRadius: 50,
        marginVertical: 8,
        marginHorizontal: 13,
        paddingVertical: 2,
        paddingHorizontal: 13,
    },
    searchInput: {
        width: '90%',
        backgroundColor: '#212121ff',
        color: COLORS.searchScreen.textColor,
        fontSize: 16,
        marginHorizontal: 5,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
})