import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../constants/color'

import screen from '../../assets/image/screen-size-icon/fullscreen.png'
import music from '../../assets/image/music-plus-icon/music-plus.png'
import filter from '../../assets/image/filter-icon/filter.png'
import photo from '../../assets/image/photo-icon/photo-icon.png'
import edit from '../../assets/image/edit-icon/edit.png'

import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const { width } = Dimensions.get('window')

const EditActivityScreen = ({ navigation, route }) => {
  const [photoUri, setphotoUri] = useState(route?.params?.photoUri || null);
  const [imageFill, setImageFill] = useState(true)

  return (
    <SafeAreaView style={styles.SafeAreaViewContainer} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.mainContainer}>
        <View style={{ height: '80%', justifyContent: 'center', alignItems: 'center', }}>
          <Image
            source={{ uri: photoUri }}
            style={{ width: width, height: width }}
            resizeMode={imageFill ? 'cover' : 'contain'}
          />

          <TouchableOpacity
            style={{ position: 'absolute', top: 10, left: 20 }}
            onPress={() => { navigation?.goBack() }}
          >
            <MaterialIcons name='close' size={30} color={'#fff'} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ position: 'absolute', bottom: 150, left: 10, padding: 10 }}
            onPress={() => { setImageFill(!imageFill) }}
          >
            <Image source={screen} style={{ width: 25, height: 25 }} resizeMode='contain' />
          </TouchableOpacity>
        </View>

        <View style={{ height: '16%', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity style={{ width: 70, height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#333', paddingVertical: 10, borderRadius: 10 }}>
              <Image source={music} style={{ width: 16, height: 16 }} resizeMode='contain' />
              <Text style={{ fontSize: 12, color: '#fff' }}>Audio</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ width: 70, height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#333', paddingVertical: 10, borderRadius: 10 }}>
              <Ionicons name='text-outline' size={16} color='#fff' />
              <Text style={{ fontSize: 12, color: '#fff' }}>Text</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ width: 70, height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#333', paddingVertical: 10, borderRadius: 10 }}>
              <Image source={photo} style={{ width: 16, height: 16 }} resizeMode='contain' />
              <Text style={{ fontSize: 12, color: '#fff' }}>Overlay</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ width: 70, height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#333', paddingVertical: 10, borderRadius: 10 }}>
              <Image source={filter} style={{ width: 16, height: 16 }} resizeMode='contain' />
              <Text style={{ fontSize: 12, color: '#fff' }}>Filter</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ width: 70, height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#333', paddingVertical: 10, borderRadius: 10 }}>
              <Image source={edit} style={{ width: 16, height: 16 }} resizeMode='contain' />
              <Text style={{ fontSize: 12, color: '#fff' }}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              marginRight: 20,
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flex: 1 }} />

            <TouchableOpacity
              style={{ width: 70, height: 40, backgroundColor: '#3797EF', justifyContent: 'center', alignItems: 'center', borderRadius: 50 }}
              onPress={() => { navigation?.navigate('FinalPageOfNewPost', { photoUri }) }}
            >
              <Text style={{ fontSize: 14, color: '#fff' }}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default EditActivityScreen

const styles = StyleSheet.create({
  SafeAreaViewContainer: {
    flex: 1,
    paddingTop: 35,
    backgroundColor: COLORS.homeScreen.backgroundColor,
  },
  mainContainer: {
    flex: 1,
  }
})