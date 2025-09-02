import { Dimensions, Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import CustomSwitch from '../../components/Toggle'
import Octicons from 'react-native-vector-icons/Octicons'

const { width } = Dimensions.get("window");

const FinalPageOfNewPost = ({ route }) => {
  const navigation = useNavigation();

  const photoUri = route?.params?.photoUri;

  const handleClose = () => {
    navigation?.goBack();
  };

  return (
    <SafeAreaView style={styles.SafeAreaViewContainer}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={handleClose}>
              <FontAwesome6 name="arrow-left" size={30} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>New post</Text>
          </View>
        </View>

        {/* Content */}
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ paddingBottom: 10, marginHorizontal: 10 }} showsVerticalScrollIndicator={false}>
            <View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  source={{ uri: photoUri }}
                  style={{ width: width / 2, height: width }}
                />
              </View>
              <TextInput
                style={{ color: '#fff', fontSize: 16, marginTop: 10, }}
                placeholder="Add a caption..."
                placeholderTextColor="#888"
                multiline
                textAlignVertical="top"
              />
            </View>

            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingTop: 10 }}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 5, width: 55, paddingHorizontal: 5, backgroundColor: '#333', borderRadius: 5, }}>
                  <FontAwesome6 name="chevron-right" size={20} color="#fff" />
                  <Text style={{ color: '#fff', fontSize: 12 }}>Poll</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 5, width: 80, paddingHorizontal: 5, backgroundColor: '#333', borderRadius: 5, }}>
                  <FontAwesome6 name="chevron-right" size={20} color="#fff" />
                  <Text style={{ color: '#fff', fontSize: 12 }}>Prompt</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                  <FontAwesome6 name="chevron-right" size={20} color="#888" />
                  <Text style={{ color: '#fff', fontSize: 16 }}>Add music</Text>
                </View>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="#888" />
              </TouchableOpacity>

              {/*
                TODO: Add Flatlist for music's
               */}
            </View>

            <View style={{ paddingTop: 10 }}>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                  <FontAwesome6 name="chevron-right" size={20} color="#fff" />
                  <Text style={{ color: '#fff', fontSize: 16 }}>Tag People</Text>
                </View>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="#888" />
              </TouchableOpacity>

              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <Octicons name="location" size={22} color="#fff" />
                  <Text style={{ color: '#fff', fontSize: 16 }}>Add Location</Text>
                </View>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="#888" />
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 }}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 15, }}>
                <FontAwesome6 name="chevron-right" size={20} color="#fff" />

                <View style={{ flexShrink: 1 }}>
                  <Text style={{ color: '#fff', fontSize: 16 }}>
                    Add AI label
                  </Text>

                  <Text style={{ color: '#aaa', fontSize: 14, width: '91%' }}>
                    We require you to label certain realistic contents that's made with AI.
                  </Text>
                </View>
              </View>

              <CustomSwitch />
            </View>


            <View style={{ borderTopWidth: 2, borderTopColor: '#333', paddingTop: 10 }}>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                  <FontAwesome6 name="chevron-right" size={20} color="#888" />
                  <Text style={{ color: '#fff', fontSize: 16 }}>Audience</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                  <Text style={{ color: '#888', fontSize: 16 }}>Everyone</Text>
                  <MaterialIcons name="keyboard-arrow-right" size={24} color="#888" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                  <FontAwesome6 name="chevron-right" size={20} color="#888" />
                  <Text style={{ color: '#fff', fontSize: 16 }}>Also share on...</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                  <Text style={{ color: '#888', fontSize: 16 }}>Off</Text>
                  <MaterialIcons name="keyboard-arrow-right" size={24} color="#888" />
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ borderTopWidth: 2, borderTopColor: '#333', paddingTop: 10 }}>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                  <FontAwesome6 name="chevron-right" size={20} color="#888" />
                  <Text style={{ color: '#fff', fontSize: 16 }}>More options</Text>
                </View>

                <MaterialIcons name="keyboard-arrow-right" size={24} color="#888" />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#3897f0',
              paddingVertical: 12,
              borderRadius: 5,
              width: '90%',       // make button wider
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontSize: 16 }}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default FinalPageOfNewPost

const styles = StyleSheet.create({
  SafeAreaViewContainer: {
    flex: 1,
    paddingTop: 35,
    paddingBottom: 20,
    backgroundColor: "black",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 15,
    zIndex: 10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  headerTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "500",
  },
})