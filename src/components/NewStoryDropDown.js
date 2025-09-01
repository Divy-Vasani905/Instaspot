import { Easing, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons';
import ai_image from '../assets/image/ai-image-icon/ai-image.png'
import layout from '../assets/image/layout-icon/layout.png'
import { Animated } from 'react-native';

const NewStoryDropDown = () => {
  const [visibleData, setVisibleData] = useState([]);
  const [isDropDownShow, setIsDropDownShow] = useState(false);
  const [isShowText, setIsShowText] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsShowText(false)
    }, 2000)
  }, [])

  useEffect(() => {
    const data = [
      { title: 'text', detail: 'Create' },
      { title: 'infinite', detail: 'Boomerang' },
      { title: 'Ai', detail: 'AI Images' },
      { title: 'Layout', detail: 'Layout' },
      { title: 'stop-circle-outline', detail: 'Hands-free' },
      { title: 'chevron-down', detail: 'Close' },
    ];

    const newVisibleData = isDropDownShow
      ? data
      : data.filter(item => item.detail !== 'Layout' && item.detail !== 'Hands-free');
    setVisibleData(newVisibleData);
  }, [isDropDownShow])

  const rotateAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isDropDownShow ? 1 : 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [isDropDownShow]);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <View style={{ position: 'absolute', top: '50%', left: 15, zIndex: 20 }}>
      <FlatList
        data={visibleData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              if (item.detail === 'Close') {
                setIsDropDownShow(!isDropDownShow);
              }
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
              <View>
                {item.title === 'Ai' ? (
                  <Image source={ai_image} style={{ width: 28, height: 28 }} resizeMode='contain' />
                ) : item.title === 'Layout' ? (
                  <Image source={layout} style={{ width: 28, height: 28 }} resizeMode='contain' />
                ) : (
                  <Animated.View
                    style={item.detail === 'Close' && {
                      transform: [{ rotate: rotateInterpolate }],
                    }}
                  >
                    <Ionicons
                      name={item.title}
                      size={28}
                      color="#fff"
                    />
                  </Animated.View>
                )}
              </View>

              {(isDropDownShow || isShowText) &&
                <Text style={{ paddingLeft: 15, fontSize: 14, fontWeight: '300', color: '#fff', lineHeight: 20 }}>
                  {item.detail}
                </Text>
              }
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default NewStoryDropDown
