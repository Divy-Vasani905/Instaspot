import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CommentsList from './CommentsList';
import { COLORS } from '../constants/color';
import RBSheet from 'react-native-raw-bottom-sheet';

const CommentBottomSheet = ({ commentRBSheet }) => {
  const { height } = Dimensions.get('window');

  return (
    <RBSheet
      ref={commentRBSheet}
      closeOnDragDown={true}
      closeOnPressMask={true}
      closeOnPressBack={true}
      draggable={true}
      dragOnContent={false}
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
          Comments
        </Text>

        {/* FlatList container */}
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
          <CommentsList />
        </View>
      </View>
    </RBSheet>
  )
}

export default CommentBottomSheet

const styles = StyleSheet.create({})