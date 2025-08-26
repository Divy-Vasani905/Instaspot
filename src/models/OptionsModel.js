import { Dimensions, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Octicons from 'react-native-vector-icons/Octicons'

import restrict_user from '../assets/image/restrict-user/restrict-user.png'
const { width, height } = Dimensions.get('screen')

const OptionsModel = ({ setShowOptions }) => {
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => { }}>
          <Image source={restrict_user} style={{ width: 30, height: 30 }} />
          <Text style={{ fontSize: 18, color: '#fff' }}>Restrict</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer} onPress={() => { }}>
          <MaterialIcons name='block-flipped' size={27} color={'red'} />
          <Text style={{ fontSize: 18, color: 'red' }}>block</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer} onPress={() => { }}>
          <Octicons name='report' size={24} color="red" />
          <Text style={{ fontSize: 18, color: 'red' }}>Report</Text>
        </TouchableOpacity>
      </View>

      <Pressable
        onPress={() => { setShowOptions(false) }}
        style={{ position: 'absolute', right: -85, top: -250, width: width, height: height }}
      />
    </>
  )
}

export default OptionsModel

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 70,
    right: -50,
    width: 150,
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 15,
    justifyContent: 'center',
    backgroundColor: '#222',
    borderRadius: 10,
    zIndex: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10
  }
})