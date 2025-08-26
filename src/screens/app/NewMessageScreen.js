import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { COLORS } from '../../constants/color'
import { messageData } from '../../utils/messageData';

const NewMessageScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(messageData);
  console.log('messageData', messageData, filteredData)

  useEffect(() => {
    const filterData = messageData.filter(item =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(filterData)
  }, [searchText])

  return (
    <SafeAreaView style={styles.SafeAreaViewContainer} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.header}>
        <View style={styles.firstSubContainer}>
          <TouchableOpacity onPress={() => { navigation.goBack() }}>
            <MaterialIcons name='arrow-back' size={30} color={'#fff'} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            New message
          </Text>
        </View>
      </View>



      <View style={styles.bodyContainer}>
        <FlatList
          data={filteredData}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <View style={styles.inputHeaderContainer}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#ccc' }}>
                  To :
                </Text>

                <TextInput
                  style={styles.inputContainer}
                  placeholder="Search"
                  placeholderTextColor={'#ccc'}
                  value={searchText}
                  onChangeText={(text) => setSearchText(text)}
                />
              </View>

              <View style={styles.headerOptionsContainer}>
                <View style={styles.optionsContainer}>
                  <View style={{ padding: 15, backgroundColor: '#333', borderRadius: 50 }}>
                    <MaterialIcons name='groups-3' size={27} color={'#fff'} />
                  </View>
                  <View style={{ width: '90%', }}>
                    <Text style={{ fontWeight: '600', fontSize: 16, color: '#fff' }}>
                      Create group chat
                    </Text>
                    <Text style={{ fontSize: 14, color: '#aaa' }}>
                      Message people privately
                    </Text>
                  </View>
                </View>

                <View style={styles.optionsContainer}>
                  <View style={{ padding: 15, backgroundColor: '#333', borderRadius: 50 }}>
                    <Feather name='smile' size={27} color={'#fff'} />
                  </View>
                  <View style={{ width: '90%', }}>
                    <Text style={{ fontWeight: '600', fontSize: 16, color: '#fff' }}>
                      AI chats
                    </Text>
                    <Text style={{ fontSize: 14, color: '#aaa' }}>
                      Discover AIs or create your own
                    </Text>
                  </View>
                </View>

                <View>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff' }}>
                    Suggested
                  </Text>
                </View>
              </View>
            </>
          }
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10, paddingHorizontal: 15 }}
                onPress={() => navigation.navigate('ChatScreen', { item: item })}
              >
                <TouchableOpacity
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                  onPress={() => { navigation.navigate('ChatScreen', { item: item }) }}
                >
                  <Image
                    source={{ uri: item.profilePic }}
                    style={{ width: 55, height: 55, borderRadius: 50, marginRight: 20 }}
                  />
                  <TouchableOpacity onPress={() => { navigation.navigate('ChatScreen', { item: item }) }}>
                    <Text style={{ fontSize: 16, color: '#fff' }}>
                      {item.name}
                    </Text>
                    <Text style={{ fontSize: 14, color: '#ccc' }}>
                      {item.username}
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              </TouchableOpacity>
            )
          }}
        />
      </View>
    </SafeAreaView>
  )
}

export default NewMessageScreen

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
  inputHeaderContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: '90%',
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#fff',
  },
  bodyContainer: {
    // fleX: 1,
    // paddingHorizontal: 20,
  },
  headerOptionsContainer: {
    paddingHorizontal: 20,
    gap: 10,
    marginVertical: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
})