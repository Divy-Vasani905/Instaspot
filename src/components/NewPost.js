import { Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Camera } from 'react-native-vision-camera'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import Ionicons from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get('window');

const NewPost = ({ photoUri, device, cameraRef, handleClose, capturePhoto, setPhotoUri }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  if (isFocused) {
    console.log('Focused Post');
  }

  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => handleClose()}>
            <Ionicons name="close-outline" size={35} color="#fff" />
          </TouchableOpacity>
        </View>
        {(photoUri && photoUri !== '') && (
          <TouchableOpacity onPress={() => navigation.navigate('EditActivityScreen', { photoUri: photoUri })}>
            <Text style={styles.nextButton}>Next</Text>
          </TouchableOpacity>
        )}
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
          />
        )}

        <View style={styles.overlayContainer}>
          <View style={[styles.overlay, { top: 0, height: "25%" }]} />
          <View style={[styles.overlay, { bottom: 0, height: "19%" }]} />

          <View style={styles.gridBox}>
            <View style={[styles.vLine, { left: "33.3%" }]} />
            <View style={[styles.vLine, { left: "66.6%" }]} />

            <View style={[styles.hLine, { top: "33.3%" }]} />
            <View style={[styles.hLine, { top: "66.6%" }]} />
          </View>
        </View>
      </View>

      {/* Capture Controls */}
      <View style={styles.controlsContainer}>
        {(photoUri && photoUri !== '') &&
          <TouchableOpacity
            onPress={() => setPhotoUri(null)}
            style={styles.retakeButton}
          >
            <Text style={{ color: '#fff' }}>Retake</Text>
          </TouchableOpacity>
        }

        {!photoUri &&
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

export default NewPost

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
    backgroundColor: "rgba(0,0,0,0.6)",
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
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  gridBox: {
    position: "absolute",
    top: "25%",
    left: 0,
    right: 0,
    width: width,
    height: width,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
    opacity: 0.7,
    zIndex: 20,
  },
  vLine: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  hLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
})
