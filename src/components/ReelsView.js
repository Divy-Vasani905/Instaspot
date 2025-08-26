import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { reelsData } from '../utils/reelData';

import { COLORS } from '../constants/color';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import ReelViewCard from './ReelViewCard';

const { height } = Dimensions.get('window');

const ReelsView = ({ route }) => {
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const { focusId } = route.params;

  const [currentIndex, setCurrentIndex] = React.useState(0);

  const onViewRef = React.useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 80 });

  useEffect(() => {
    if (focusId && reelsData.length > 0) {
      const index = reelsData.findIndex(post => post.id === focusId);
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
          Reels
        </Text>
      </View>
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
    </SafeAreaView>
  )
}

export default ReelsView

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
})