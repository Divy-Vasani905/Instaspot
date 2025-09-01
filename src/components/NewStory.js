import { FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Camera } from 'react-native-vision-camera'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import NewStoryDropDown from './NewStoryDropDown';

import Ionicons from "react-native-vector-icons/Ionicons";

import flash_on from '../assets/image/flash-icons/flash.png'
import flash_off from '../assets/image/flash-icons/flash-off.png'
import flash_auto from '../assets/image/flash-icons/flash-auto.png'

const NewStory = ({ photoUri, device, cameraRef, handleClose, capturePhoto, setPhotoUri }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [flash, setFlash] = useState("off");

  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => handleClose()}>
            <Ionicons name="close-outline" size={35} color="#fff" />
          </TouchableOpacity>
        </View>
        {(photoUri === '') && (
          <TouchableOpacity
            onPress={() => setFlash(flash === "off" ? "on" : flash === "on" ? "auto" : "off")}
          >
            <Image
              source={flash === "auto" ? flash_auto : flash === "on" ? flash_on : flash_off}
              style={{ width: 25, height: 25 }}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => { }}
        >
          <Ionicons name="settings-sharp" size={28} color="#fff" />
        </TouchableOpacity>
        {/* <TouchableOpacity
          disabled={!(photoUri && photoUri !== '')}
          onPress={() => navigation.navigate('EditActivityScreen', { photoUri: photoUri })}
        >
          <Text style={styles.nextButton}>Next</Text>
        </TouchableOpacity> */}
      </View>

      {/* Camera Container */}
      <View style={styles.cameraContainer}>
        {photoUri ? (
          <Image
            source={{ uri: photoUri }}
            style={StyleSheet.absoluteFill}
          />
        ) : isFocused && (
          <Camera
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            photo={true}
            flash={flash}
          />
        )}

        <NewStoryDropDown />
      </View >

      {/* Capture Controls */}
      <View View style={styles.controlsContainer} >
        {(photoUri && photoUri !== '') &&
          <TouchableOpacity
            onPress={() => setPhotoUri('')}
            style={styles.retakeButton}
          >
            <Text style={{ color: '#fff' }}>Retake</Text>
          </TouchableOpacity>
        }

        {
          !photoUri &&
          <TouchableOpacity
            style={styles.captureButton}
            onPress={() => capturePhoto()}
          >
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>
        }
      </View>
    </>
  )
}

export default NewStory

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
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
  nextButton: {
    fontSize: 18,
    color: "#3797EF",
    fontWeight: "500",
  },
  cameraContainer: {
    flex: 1,
    marginBottom: 150,
    overflow: "hidden",
    backgroundColor: "black",
    borderRadius: 20,
  },
  controlsContainer: {
    position: "absolute",
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: 'center',
    gap: 20,
  },
  retakeButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: "#fff",
    padding: 3,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    alignSelf: 'center',
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
  },
})
