import { Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'

import { COLORS } from '../constants/color';
import RBSheet from 'react-native-raw-bottom-sheet';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { usersData } from '../utils/usersData';
import { shareData } from '../utils/shareData';

const ShareBottomSheet = ({ shareRBSheet }) => {
  const { height } = Dimensions.get('window');

  return (
    <RBSheet
      ref={shareRBSheet}
      closeOnDragDown={true}
      closeOnPressMask={true}
      closeOnPressBack={true}
      draggable={true}
      dragOnContent={false}
      height={height * 0.5}
      customStyles={{
        wrapper: {
          backgroundColor: "rgba(0, 0, 0, 0.4)"
        },
        draggableIcon: {
          backgroundColor: "#ccc",
          width: 50,
          height: 2,
          borderRadius: 14,
          marginTop: 15,
        },
        container: {
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          backgroundColor: '#222',
        },
      }}
    >
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 12,
            marginHorizontal: 16,
            margin: 8,
            borderRadius: 20,
            backgroundColor: '#333'
          }}
        >
          <Ionicons name='search' size={18} color={'#bbb'} />
          <TextInput
            placeholder='Search'
            placeholderTextColor={'#bbb'}
            style={{
              color: '#fff',
              paddingHorizontal: 10,
              flex: 1
            }}
          />
        </View>

        {/* FlatList container */}
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
          <FlatList
            data={usersData}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            numColumns={3}
            contentContainerStyle={{ paddingBottom: 20 }}
            columnWrapperStyle={{ justifyContent: "flex-start" }}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.peopleCard} onPress={() => { }}>
                <Image source={{ uri: item.profilePic }} style={styles.storyImage} />
                <Text numberOfLines={2} style={styles.name}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <FlatList
            data={shareData}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={{ alignItems: "center", marginHorizontal: 10 }}>
                <View style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: '#444',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <FontAwesome name={item.icon} size={26} color="#fff" />
                </View>
                <Text
                  numberOfLines={2}
                  style={{ color: "#fff", width: 56, fontSize: 12, marginTop: 6, textAlign: "center" }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </RBSheet>
  )
}

export default ShareBottomSheet

const styles = StyleSheet.create({
  peopleCard: {
    width: 120,
    alignItems: "center",
    marginVertical: 10,
    marginRight: 15,
  },
  storyImage: {
    width: 90,
    height: 90,
    borderRadius: 60,
    marginBottom: 6,
  },
  name: {
    fontSize: 14,
    color: COLORS.homeScreen.textColor,
    textAlign: "center",
  },
});
