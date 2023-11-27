import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Loader from '../../../components/loader'
import { globalColors } from '../../../styles/globalColors'
const { width } = Dimensions.get('screen');
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const cards = [
  {
    title: 'Gaming Event',
    date: '29th October, 2023',
    createdBy: "You",
    attendees: 10,
  },
  {
    title: 'Gaming Event',
    date: '29th October, 2023',
    createdBy: "You",
    attendees: 10,
  },
  {
    title: 'Gaming Event',
    date: '29th October, 2023',
    createdBy: "You",
    attendees: 10,
  },
  // Add more cards as needed
];

const yourGroups = [
  {
    title: 'GamersX',
    event: 1,
    role: "Leader",
    attendees: 10,
  },
  {
    title: 'CricArena',
    event: 0,
    role: "Member",
    attendees: 10,
  },
  // Add more cards as needed
];

const Home = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.upcoming}>Upcoming Events</Text>
        <Text style={styles.viewAll}>View All</Text>
      </View>
      <View style={styles.sliderContainerPre}>
        <Ionicons name="caret-back-outline" size={20} color={globalColors.buttonColor} />
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sliderContainer}
        >
          {cards.map((card, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.inCard}>
                <Text style={styles.cardDate}>{card.date}</Text>
                <Text style={styles.cardTitle}>{card.title}</Text>
                <Text style={styles.cardCreatedBy}>Created By: <Text style={styles.cardCreatedByPerson}>{card.createdBy}</Text></Text>
                <View style={styles.groupAttendees}>
                  <Ionicons name="people" size={20} color={globalColors.textColor} />
                  <Text style={styles.groupCardAttendees}>{card.attendees}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
        <Ionicons name="caret-forward-outline" size={20} color={globalColors.buttonColor} />
      </View>
      <View style={styles.lineContainer} >
        <View style={styles.line} />
      </View>
      <View style={styles.heading}>
        <Text style={styles.upcoming}>Your Groups</Text>
        <Text style={styles.viewAll}>View All</Text>
      </View>
      <View style={styles.yourGroups}>
        {yourGroups.map((card, index) => (
          <View key={index} style={styles.groupCard}>
            <View style={styles.inCard}>
              <Text style={styles.groupCardTitle}>{card.title}</Text>
              <Text style={styles.groupCardEvent}>{card.event > 0 ? `${card.event} event(s)` : "No Event"}</Text>
              <View style={styles.groupCardBottom}>
                <View style={styles.groupAttendees}>
                  <Ionicons name="people" size={20} color={globalColors.textColor} />
                  <Text style={styles.groupCardAttendees}>{card.attendees}</Text>
                </View>
                <Text style={styles.role}>{card.role}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  sliderContainerPre: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
  },
  sliderContainer: {
    justifyContent: 'center',
  },
  card: {
    width: width - 40 - 40 * 2,
    margin: 10,
    borderRadius: 20,
    backgroundColor: globalColors.blue,
    height: 130,
    maxHeight: 130,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    backgroundColor: globalColors.backgroundColor,
    paddingHorizontal: 28,
    paddingVertical: 5,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  upcoming: {
    color: globalColors.buttonColor,
    fontSize: 24,
    fontFamily: "Poppins_600SemiBold"
  },
  viewAll: {
    color: globalColors.buttonColor,
    fontSize: 18,
    fontFamily: "Poppins_400Regular"
  },
  inCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  cardDate: {
    color: globalColors.textColor,
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold"
  },
  cardTitle: {
    color: globalColors.textColor,
    fontSize: 20,
    fontFamily: "Poppins_700Bold"
  },
  cardCreatedBy: {
    color: globalColors.textColor,
    fontSize: 16,
    fontFamily: "Poppins_300Light"
  },
  cardCreatedByPerson: {
    color: globalColors.textColor,
    fontSize: 16,
    fontFamily: "Poppins_700Bold"
  },
  lineContainer: {
    width: "95%",
    marginTop: 27,
    marginBottom: 17,
    alignSelf: 'center',
  },
  line: {
    height: 2,
    backgroundColor: globalColors.buttonColor,
  },
  groupCard: {
    backgroundColor: globalColors.buttonColor,
    height: 150,
    maxHeight: 150,
    width: "48%",
    maxWidth: 175,
    borderRadius: 30,
    padding: 17,
  },
  groupCardTitle: {
    fontSize: 26,
    fontFamily: "Poppins_600SemiBold",
    color: globalColors.textColor,
  },
  groupCardEvent: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: globalColors.textColor,
  },
  groupCardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: "100%",
    marginTop: 10,
  },
  groupAttendees: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  groupCardAttendees: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    color: globalColors.textColor,
    marginLeft: 5,
  },
  role: {
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
    color: globalColors.textColor,
  },
  yourGroups: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: "100%",
    marginTop: 10,
  }
})