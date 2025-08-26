import { FlatList, Image, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/color';

import video_call from '../../assets/image/video-call/video-call.png';
import photo from '../../assets/image/photo-icon/photo-icon.png';
import sticker from '../../assets/image/sticker-smile/sticker-smile.png';

import { chatsData } from '../../utils/chatsData';
import { userData } from '../../utils/userData';

const ChatScreen = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params;

  const [chat, setChat] = useState(null);
  const flatListRef = useRef(null);

  function getChatBetweenUsers(userId, receiverId) {
    return chatsData.find(
      (item) =>
        item.participants.some((p) => p.userId === userId) &&
        item.participants.some((p) => p.userId === receiverId)
    );
  }

  function getSenderObject(chat, senderId) {
    return chat?.participants.find((p) => p.userId === senderId);
  }

  useEffect(() => {
    const foundChat = getChatBetweenUsers(userData.id, item.user.id);
    setChat(foundChat);
  }, [item]);

  useEffect(() => {
    if (chat?.messages?.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: false });
      }, 50);
    }
  }, [chat?.messages]);


  if (!chat) {
    return (
      <SafeAreaView style={styles.SafeAreaViewContainer}>
        <Text style={{ color: '#fff', textAlign: 'center', marginTop: 20 }}>
          No chat found.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.SafeAreaViewContainer} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <View style={styles.header}>
          <View style={styles.firstSubContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name='arrow-back' size={30} color={'#fff'} />
            </TouchableOpacity>
            <View style={styles.headerTitle}>
              <TouchableOpacity onPress={() => navigation.navigate('OthersProfileScreen', { item: item })}>
                <Image
                  source={{ uri: item.profilePic }}
                  style={{ width: 40, height: 40, borderRadius: 50, marginRight: 10 }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('ChatDetailsScreen', { item: item })}>
                <Text style={styles.headerTitleText}>{item.name}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.lastSubContainer}>
            <TouchableOpacity onPress={() => { }}>
              <Ionicons name='call-outline' color={'white'} size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }}>
              <Image
                source={video_call}
                style={{ width: 30, height: 30, borderRadius: 50, marginRight: 10 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          ref={flatListRef}
          data={chat.messages}
          style={{ flex: 1, marginTop: 10, }}
          contentContainerStyle={{
            paddingHorizontal: 15,
            paddingBottom: 5,
            flexGrow: 1,
            justifyContent: 'flex-end',
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(msg) => msg.messageId}
          ListHeaderComponent={() => (
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              <Image
                source={{ uri: item.profilePic }}
                style={{ width: 90, height: 90, borderRadius: 50 }}
              />
              <Text style={{ fontSize: 17, fontWeight: '600', color: '#fff', marginTop: 10 }}>
                {item.name}
              </Text>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#ddd' }}>
                {item.username}
              </Text>
              <Text style={{ fontSize: 14, color: '#888' }}>
                {item?.followers} followers - {item?.posts} posts
              </Text>
              <Text style={{ fontSize: 14, color: '#888' }}>
                You follow each other on Instaspot
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('OthersProfileScreen', { item: item });
                }}
                style={{
                  marginTop: 10,
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  backgroundColor: '#333',
                  borderRadius: 10,
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#fff' }}>
                  View Profile
                </Text>
              </TouchableOpacity>
            </View>
          )}
          renderItem={({ item: msg }) => {
            const senderObj = getSenderObject(chat, msg.senderId);
            const isCurrentUser = msg.senderId === userData.id;

            return (
              <View
                style={{
                  flexDirection: isCurrentUser ? 'row-reverse' : 'row',
                  alignItems: 'flex-end',
                  marginVertical: 4,
                }}
              >
                {!isCurrentUser && (
                  <Image
                    source={{ uri: senderObj?.profilePic }}
                    style={{ width: 30, height: 30, borderRadius: 16, marginRight: 6 }}
                  />
                )}
                <View
                  style={{
                    maxWidth: '75%',
                    backgroundColor: isCurrentUser ? '#3797EF' : '#262626',
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    borderRadius: 20,
                    borderBottomRightRadius: isCurrentUser ? 4 : 20,
                    borderBottomLeftRadius: isCurrentUser ? 20 : 4,
                  }}
                >
                  <Text style={{ color: '#fff', fontSize: 15 }}>{msg.text}</Text>
                </View>
              </View>
            );
          }}
        />

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          paddingVertical: 5,
          marginHorizontal: 10,
          marginBottom: 20,
          borderRadius: 30,
          backgroundColor: '#333',
        }}>
          <TouchableOpacity style={{ padding: 5, marginRight: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 30, backgroundColor: '#ef3737ff' }}>
            <FontAwesome name='camera' size={20} color={'#fff'} />
          </TouchableOpacity>

          <View style={{ flex: 1 }}>
            <TextInput
              placeholder='Message...'
              style={{
                fontSize: 18,
                marginRight: 10,
                color: '#fff'
              }}
              multiline
            />
          </View>

          <TouchableOpacity
            style={{ marginRight: 10, alignItems: 'center', justifyContent: 'center' }}
          >
            <Ionicons name='mic-outline' size={25} color={'#fff'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginRight: 10, alignItems: 'center', justifyContent: 'center' }}
          >
            <Image
              source={sticker}
              style={{ width: 25, height: 25 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginRight: 10, alignItems: 'center', justifyContent: 'center' }}
          >
            <Image
              source={photo}
              style={{ width: 25, height: 25 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginRight: 10, alignItems: 'center', justifyContent: 'center' }}
          >
            <Feather name='plus-circle' size={25} color={'#fff'} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

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
  firstSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  headerTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  lastSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 25,
    paddingHorizontal: 2,
  },
});
