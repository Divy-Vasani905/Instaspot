import React, { useRef, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import PagerView from "react-native-pager-view";

const { width } = Dimensions.get("window");
const data = ["POST", "STORY", "REEL", "LIVE"];
const ITEM_WIDTH = 80;

export default function CenteredTabsWithPages() {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  const pagerRef = useRef(null);

  const onTabPress = (index) => {
    setActiveIndex(index);
    flatListRef.current?.scrollToIndex({ index, animated: true });
    pagerRef.current?.setPage(index);
  };

  const onPageSelected = (e) => {
    const index = e.nativeEvent.position;
    setActiveIndex(index);
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      {/* Tabs */}
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.tab}
            onPress={() => onTabPress(index)}
          >
            <Text
              style={[
                styles.tabText,
                activeIndex === index && styles.activeTabText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{
          paddingHorizontal: (width - ITEM_WIDTH) / 2,
        }}
        getItemLayout={(data, i) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * i,
          index: i,
        })}
      />

      {/* Pages */}
      <PagerView
        ref={pagerRef}
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={onPageSelected}
      >
        {data.map((item, index) => (
          <View key={index} style={styles.page}>
            <Text style={{ color: "white", fontSize: 22 }}>{item} Page</Text>
          </View>
        ))}
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  tab: {
    width: ITEM_WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
  tabText: {
    color: "#ccc",
    fontSize: 16,
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
