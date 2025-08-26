import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import { COLORS } from '../constants/color';
import RBSheet from 'react-native-raw-bottom-sheet';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import hide from '../assets/image/hide-eye/hide-eye.png'

const ActionBottomSheet = ({ actionRBSheet }) => {
  const { height } = Dimensions.get('window');

  return (
    <RBSheet
      ref={actionRBSheet}
      closeOnDragDown={true}
      closeOnPressMask={true}
      closeOnPressBack={true}
      draggable={true}
      dragOnContent={true}
      height={height * 0.5}
      customStyles={{
        wrapper: {
          backgroundColor: "rgba(0,0,0,0.5)"
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
        <View style={styles.topContainer}>
          <TouchableOpacity style={styles.action}>
            <View style={styles.iconWrapper}>
              <MaterialIcons name={false ? "bookmark" : "bookmark-outline"} size={28} color="#fff" />
            </View>
            <Text style={styles.label}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action}>
            <View style={styles.iconWrapper}>
              <MaterialIcons name='qr-code-scanner' size={28} color="#fff" />
            </View>
            <Text style={styles.label}>QR code</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.bottomAction}>
            <View style={styles.bottomIconWrapper}>
              <MaterialIcons name='star-outline' size={30} color="#fff" />
            </View>
            <Text style={styles.bottomLabel}>Add to favorites</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomAction}>
            <View style={styles.bottomIconWrapper}>
              <Ionicons name='person-remove-outline' size={26} color="#fff" />
            </View>
            <Text style={styles.bottomLabel}>Unfollow</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomAction}>
            <View style={styles.bottomIconWrapper}>
              <MaterialIcons name='error-outline' size={28} color="#fff" />
            </View>
            <Text style={styles.bottomLabel}>Why you're seeing this post</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomAction}>
            <View style={styles.bottomIconWrapper}>
              <Image source={hide} style={styles.hideIcon} />
            </View>
            <Text style={styles.bottomLabel}>Hide</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomAction}>
            <View style={styles.bottomIconWrapper}>
              <Ionicons name='person-circle' size={28} color="#fff" />
            </View>
            <Text style={styles.bottomLabel}>About this account</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomAction}>
            <View style={styles.bottomIconWrapper}>
              <Octicons name='report' size={25} color="red" />
            </View>
            <Text style={styles.bottomLabel}>Report</Text>
          </TouchableOpacity>
        </View>
      </View>
    </RBSheet>
  )
}

export default ActionBottomSheet

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-around",
    alignItems: "center",
  },
  action: {
    alignItems: "center",
    flex: 1,
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
  },
  bottomContainer: {
    flex: 1,
    padding: 20,
  },
  bottomAction: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  bottomIconWrapper: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  hideIcon: {
    width: 26,
    height: 26,
  },
  bottomLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: "#fff",
  },
})