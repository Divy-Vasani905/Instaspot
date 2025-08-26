import { Dimensions, FlatList, SafeAreaView, StyleSheet, } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants/color'

import { reelsData } from '../../utils/reelData'
import ReelViewCard from '../../components/ReelViewCard'
import { useNavigation } from '@react-navigation/native'

const { height } = Dimensions.get('window');

const ReelScreen = () => {
    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const onViewRef = React.useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    });

    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 80 });

    return (
        <SafeAreaView style={styles.SafeAreaViewContainer} edges={['top', 'left', 'right']}>
            {/* <View style={styles.container}> */}
            <FlatList
                data={reelsData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                    <ReelViewCard navigation={navigation} id={item.id} isVisible={index === currentIndex}
                    />
                )}
                showsVerticalScrollIndicator={false}
                pagingEnabled
                decelerationRate="fast"
                snapToInterval={height}
                snapToAlignment="start"
                onViewableItemsChanged={onViewRef.current}
                viewabilityConfig={viewConfigRef.current}
            />
            {/* </View> */}
        </SafeAreaView>
    )
}

export default ReelScreen

const styles = StyleSheet.create({
    SafeAreaViewContainer: {
        flex: 1,
        paddingTop: 35,
        backgroundColor: COLORS.homeScreen.backgroundColor,
    },
    container: {
        flex: 0.9,
        marginVertical: 10,
        backgroundColor: COLORS.homeScreen.backgroundColor,
    },
})