import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import CustomSwitch from '../../components/Toggle';

import { COLORS } from '../../constants/color'
import restrict_user from '../../assets/image/restrict-user/restrict-user.png'

const Privacy_SafetyOfMessageScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.SafeAreaViewContainer} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.header}>
        <View style={styles.firstSubContainer}>
          <TouchableOpacity onPress={() => { navigation.goBack() }}>
            <MaterialIcons name='arrow-back' size={30} color={'#fff'} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            Privacy & Safety
          </Text>
        </View>
      </View>

      <View style={styles.bodyContainer}>
        <View>
          <View style={{ paddingHorizontal: 20, paddingVertical: 10, }}>
            <Text style={{ fontSize: 18, fontWeight: '400', color: '#fff' }}>
              ordinarie_here
            </Text>
          </View>

          <TouchableOpacity style={{ flexDirection: 'row', gap: 10, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#111' }}>
            <Ionicons name='information-circle-outline' size={28} color="#eee" />
            <Text style={{ fontSize: 16, color: '#eee' }}>
              About this account
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <View style={{ paddingHorizontal: 20, paddingVertical: 10, }}>
            <Text style={{ fontSize: 18, fontWeight: '400', color: '#fff' }}>
              Keeping your message secure
            </Text>
          </View>

          <TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#111' }}>
            <Text style={{ fontSize: 16, color: '#eee' }}>
              Use end-to-end encryption
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <View style={{ paddingHorizontal: 20, paddingVertical: 10, }}>
            <Text style={{ fontSize: 18, fontWeight: '400', color: '#fff' }}>
              Who can see your activity
            </Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
              <View>
                <Text style={{ fontSize: 18, color: '#fff' }}>
                  Read receipts
                </Text>
              </View>
              <View style={{ gap: 15 }}>
                <Text style={{ fontSize: 14, color: '#aaa', width: 290 }}>
                  Others can see when you're read their messages.
                </Text>
                <Text style={{ fontSize: 14, color: '#aaa', width: 290 }}>
                  Disappearing messages always send read receipts.
                </Text>
              </View>
            </View>
            <View style={{ paddingHorizontal: 20 }}>
              <CustomSwitch />
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ paddingHorizontal: 20, }}>
              <View>
                <Text style={{ fontSize: 18, color: '#fff' }}>
                  Typing indicator
                </Text>
              </View>
              <View style={{ gap: 15 }}>
                <Text style={{ fontSize: 14, color: '#aaa', width: 290 }}>
                  Others can see when you're typing.
                </Text>
              </View>
            </View>
            <View style={{ paddingHorizontal: 20 }}>
              <CustomSwitch />
            </View>
          </View>

        </View>

        <View>
          <View style={{ paddingHorizontal: 20, paddingVertical: 10, }}>
            <Text style={{ fontSize: 18, fontWeight: '400', color: '#fff' }}>
              Who can reach you
            </Text>
          </View>

          <TouchableOpacity style={{ flexDirection: 'row', gap: 10, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#111' }}>
            <Image source={restrict_user} style={{ width: 30, height: 30 }} />
            <Text style={{ fontSize: 16, color: '#eee' }}>
              Restrict
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row', gap: 10, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#111' }}>
            <MaterialIcons name='block-flipped' size={30} color="red" />
            <Text style={{ fontSize: 16, color: 'red' }}>
              Block
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <View style={{ paddingHorizontal: 20, paddingVertical: 10, }}>
            <Text style={{ fontSize: 18, fontWeight: '400', color: '#fff' }}>
              Support
            </Text>
          </View>

          <TouchableOpacity style={{ flexDirection: 'row', gap: 10, paddingHorizontal: 20, paddingVertical: 10 }}>
            <Octicons name='report' size={25} color="red" />
            <Text style={{ fontSize: 16, color: 'red' }}>
              Report
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Privacy_SafetyOfMessageScreen

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
    gap: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  bodyContainer: {
    flex: 1,
  }
})