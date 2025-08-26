import React, { useState, useRef, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";

import repeat from '../assets/image/repeat-icon/repeat.png'

const { width } = Dimensions.get("window");

const data = ["POST", "STORY", "REEL", "LIVE"];
const ITEM_WIDTH = 80;

const CenteredTabs = ({ photoUri, pickFromGallery, cameraSideBack, setCameraSideBack, activeFor, setActiveFor }) => {
  const index = data.findIndex((item) => item?.toLowerCase() === activeFor?.toLowerCase());
  const [activeIndex, setActiveIndex] = useState(index >= 0 ? index : 0);
  const flatListRef = useRef(null);

  const onScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / ITEM_WIDTH);
    setActiveIndex(index);
    setActiveFor(data[index]);
  };

  useEffect(() => {
    setActiveFor(data[activeIndex]);
  }, [activeIndex, setActiveFor]);

  return (
    <View style={{ flex: 1, backgroundColor: "black", justifyContent: "center" }}>
      {photoUri && (
        <TouchableOpacity onPress={pickFromGallery} style={styles.previewContainer}>
          <Image source={{ uri: photoUri }} style={styles.preview} />
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => { setCameraSideBack(!cameraSideBack) }} style={styles.cameraSideContainer}>
        <Image source={repeat} style={styles.repeatPreview} />
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          const isVisible = Math.abs(activeIndex - index) <= 1;

          return (
            <TouchableOpacity style={styles.item}>
              <Text
                style={{
                  color: activeIndex === index ? "#fff" : "#ccc",
                  fontSize: 16,
                  fontWeight: activeIndex === index ? "600" : "400",
                  opacity: isVisible ? 1 : 0,
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: (width - ITEM_WIDTH) / 2,
        }}
        initialScrollIndex={activeIndex}
        getItemLayout={(data, i) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * i,
          index: i,
        })}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: ITEM_WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
  previewContainer: {
    position: "absolute",
    top: -15,
    left: 30,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 8,
    zIndex: 10,
    overflow: "hidden",
  },
  preview: {
    width: 50,
    height: 50,
    resizeMode: "cover",
  },
  cameraSideContainer: {
    position: "absolute",
    top: 0,
    right: 30,
    zIndex: 10,
  },
  repeatPreview: {
    width: 30,
    height: 30,
  },
});

export default CenteredTabs;
