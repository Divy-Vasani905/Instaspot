import { Alert, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { use, useEffect, useRef, useState } from 'react'
import { COLORS } from '../../constants/color'
import { useNavigation } from '@react-navigation/native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';


import disappearing from '../../assets/image/disappearing-icon/disappearing.png'
import profile from '../../assets/image/profile-icon/profile.png'
import NotificationBottomSheet from '../../components/NotificationBottomSheet';
import OptionsModel from '../../models/OptionsModel';

const ChatDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params;

  const [showOptions, setShowOptions] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const searchRef = useRef(null);
  const notificationRBSheet = useRef(null);

  const handleSearch = () => {
    setShowSearchBox(!showSearchBox);
  }
  useEffect(() => {
    if (showSearchBox && searchRef.current) {
      setTimeout(() => {
        searchRef.current.focus();
      }, 0);
    }
  }, [showSearchBox])

  return (
    <SafeAreaView style={styles.SafeAreaViewContainer} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name='arrow-back' size={30} color={'#fff'} />
        </TouchableOpacity>
        {showSearchBox && (
          <TextInput
            ref={searchRef}
            placeholder="Search"
            style={styles.searchInput}
            placeholderTextColor="#aaa"
          />
        )}
      </View>

      <View style={[{ alignItems: 'center', marginBottom: 20, gap: 10, }, showSearchBox && { opacity: 0.7 }]}>
        <Image
          source={{ uri: item.profilePic }}
          style={{ width: 90, height: 90, borderRadius: 50 }}
        />
        <Text style={{ fontSize: 22, fontWeight: '600', color: '#fff', marginTop: 10 }}>
          {item.name}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginTop: 5 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('OthersProfileScreen', { item: item });
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
            }}
          >
            <Image
              source={profile}
              style={{ width: 35, height: 35 }}
            />
            <Text style={{ fontSize: 14, color: '#fff' }}>
              Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleSearch()
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
            }}
          >
            <Ionicons name="search-outline" size={30} color={'#fff'} />
            <Text style={{ fontSize: 14, color: '#fff' }}>
              Search
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              notificationRBSheet.current.open()
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
            }}
          >
            <Ionicons name="notifications-outline" size={30} color={'#fff'} />
            <Text style={{ fontSize: 14, color: '#fff' }}>
              Mute
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShowOptions(!showOptions)
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
            }}
          >
            <Entypo name="dots-three-horizontal" size={30} color={'#fff'} />
            <Text style={{ fontSize: 14, color: '#fff' }}>
              Options
            </Text>
          </TouchableOpacity>
          {showOptions && (
            <OptionsModel setShowOptions={setShowOptions} />
          )}
        </View>
      </View>

      <View style={{ marginHorizontal: 15, gap: 10 }}>
        <TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <FontAwesome name="circle" size={30} color={'#333'} />
            <View>
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#fff' }}>
                Theme
              </Text>
              <Text style={{ fontSize: 14, color: '#aaa' }}>
                Black
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <Image
              source={disappearing}
              style={{ width: 30, height: 30 }}
            />
            <View>
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#fff' }}>
                Disappearing messages
              </Text>
              <Text style={{ fontSize: 14, color: '#aaa' }}>
                off
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <Ionicons name="lock-closed-outline" size={30} color={'#fff'} />
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#fff' }}>
              Privacy & safety
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <FontAwesome name="circle" size={30} color={'#fff'} />
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#fff' }}>
              Nicknames
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <MaterialIcons name="group-add" size={25} color={'#fff'} />
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#fff' }}>
              Create a group chat
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <NotificationBottomSheet notificationRBSheet={notificationRBSheet} />
    </SafeAreaView>
  )
}

export default ChatDetailsScreen

const styles = StyleSheet.create({
  SafeAreaViewContainer: {
    flex: 1,
    paddingTop: 35,
    backgroundColor: COLORS.homeScreen.backgroundColor,
  },
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingHorizontal: 18,
  },
  searchInput: {
    width: '90%',
    height: 40,
    borderRadius: 10,
    backgroundColor: '#444',
    paddingHorizontal: 10,
    color: '#fff'
  }

});