import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RBSheet from 'react-native-raw-bottom-sheet'
import { COLORS } from '../constants/color';
import CustomSwitch from './Toggle';

const NotificationBottomSheet = ({ notificationRBSheet }) => {
  const { height } = Dimensions.get('window');
  return (
    <RBSheet
      ref={notificationRBSheet}
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
        <Text
          style={{
            fontSize: 16,
            color: COLORS.homeScreen.textColor,
            textAlign: "center",
            paddingVertical: 8,
          }}
        >
          Notifications
        </Text>

        <View style={{ flex: 1, paddingHorizontal: 20, gap: 30 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 14, color: COLORS.homeScreen.textColor }}>
              Mute messages
            </Text>
            <CustomSwitch small={true} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 14, color: COLORS.homeScreen.textColor }}>
              Mute calls
            </Text>
            <CustomSwitch small={true} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={{ fontSize: 14, color: COLORS.homeScreen.textColor }}>
                Mute Hide message previews
              </Text>
              <Text style={{ fontSize: 13, color: '#aaa' }}>
                Don't show previews in push notifications
              </Text>
            </View>
            <CustomSwitch small={true} />
          </View>
        </View>
      </View>
    </RBSheet>
  )
}

export default NotificationBottomSheet

const styles = StyleSheet.create({})