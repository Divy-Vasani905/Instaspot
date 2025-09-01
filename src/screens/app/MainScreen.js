import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import HomeScreen from './HomeScreen';
import MessageScreen from './MessageScreen';
import Gallery from './Gallery';
import { useNavigation } from '@react-navigation/native';

const MainScreen = () => {
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (e) => {
    const page = e.nativeEvent.position;
    setCurrentPage(page);

    // Apply tabBar style based on final page
    navigation.setOptions({
      tabBarStyle:
        page === 0 || page === 2
          ? { display: 'none' }
          : {
            position: 'absolute',
            backgroundColor: '#111',
            height: 70,
            borderTopWidth: 0,
          },
    });
  };

  const handlePageScrollStateChanged = (e) => {
    if (e.nativeEvent.pageScrollState === 'dragging') {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'flex' } });
    }
  };

  return (
    <PagerView
      style={styles.pagerView}
      initialPage={currentPage}
      onPageSelected={handlePageChange}
      onPageScrollStateChanged={handlePageScrollStateChanged}
    >
      <View key="1" style={styles.page}>
        {/* <Gallery /> */}
      </View>

      <View key="2" style={styles.page}>
        <HomeScreen />
      </View>

      <View key="3" style={styles.page}>
        <MessageScreen />
      </View>
    </PagerView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
  page: {
    flex: 1,
  },
});
