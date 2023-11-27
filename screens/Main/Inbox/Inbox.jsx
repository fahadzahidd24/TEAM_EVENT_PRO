import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { globalColors } from '../../../styles/globalColors'
import { FlatList } from 'react-native'
import Card from '../../../components/Inbox/card'
import { useNavigation } from '@react-navigation/native'

const inboxData = [
  {
    id: 1,
    name: "Group 1",
    events: 5,
    role: "Leader",
    messages: 2
  },
  {
    id: 2,
    name: "Group 2",
    events: 0,
    role: "Member",
    messages: 0
  },
  {
    id: 3,
    name: "Group 3",
    events: 2,
    role: "Member",
    messages: 69
  },
]


const Inbox = () => {
  const navigation = useNavigation();

  const pressHandler = (name) => {
    navigation.navigate('Chat', { name: name });
  }

  return (
    <View style={styles.container}>
      <View style={styles.firstOrange}></View>
      <View style={styles.secondOrange}></View>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Your Groups</Text>
      </View>
      <View style={styles.flatListContainer}>
        <FlatList data={inboxData} renderItem={({ item }) => <Card data={item} onPress={pressHandler} />} keyExtractor={(item) => item.id.toString()} />
      </View>
    </View>
  )
}

export default Inbox

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.backgroundColor,
    paddingHorizontal: 28,
    paddingVertical: 5,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: globalColors.buttonColor,
    fontSize: 30,
    fontFamily: "Poppins_600SemiBold"
  },
  firstOrange: {
    backgroundColor: globalColors.lightOrange,
    height: 338,
    width: 338,
    borderRadius: 338,
    position: 'absolute',
    top: -150,
    left: -200,
    opacity: 0.6,
  },
  secondOrange: {
    backgroundColor: globalColors.lightOrange,
    height: 338,
    width: 338,
    borderRadius: 338,
    position: 'absolute',
    bottom: 10,
    right: -250,
    opacity: 0.6,
  },
  // flatListContainer:{
  //   width: "0%",
  // }
})