import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Calendar } from 'react-native-calendars';
import { globalColors } from '../../../styles/globalColors';

const CalendarScreen = () => {
  const [selected, setSelected] = useState('');

  const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' };
  const massage = { key: 'massage', color: 'blue', selectedDotColor: 'blue' };
  const workout = { key: 'workout', color: 'green' };

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar style={styles.calendar}
          
          onDayPress={day => {
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: { selected: true, disableTouchEvent: true }
          }}
          theme={{
            calendarBackground: globalColors.buttonColor,
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: globalColors.orange,
            selectedDayTextColor: '#ffffff',
            todayTextColor: globalColors.textColor,
            dayTextColor: globalColors.textColor,
            textDisabledColor: 'grey',
            dotColor: globalColors.orange,
            todayDotColor: globalColors.orange,
            monthTextColor: globalColors.textColor,
            arrowColor: globalColors.textColor,
          }}
          marking={{
            dots: [vacation, massage, workout],
            marked: true,
          }}
          markingType='multi-period'
        ></Calendar>
      </View>
      <View>
        <Text style={styles.upcoming}>Upcoming Events</Text>
      </View>
      <View style={styles.upcomingEventsContainer}>
          <View style={styles.upcomingEvent}>
            <Text style={styles.eventDate}>October 23,2023</Text>
            <Text style={styles.eventName}>Cricket Tournament</Text>
          </View>
      </View>
    </View>
  )
}

export default CalendarScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  calendarContainer: {
    width: "100%",
  },
  calendar: {
    backgroundColor: globalColors.buttonColor,
    borderRadius: 20,
    color: globalColors.textColor,
    padding: 20
  },
  calendarHeader: {
    color: globalColors.textColor,
  },
  upcoming:{
    fontSize: 30,
    fontFamily: "Poppins_700Bold",
    color: globalColors.buttonColor,
    marginVertical: 24,
  },
  upcomingEventsContainer:{
    width: "100%",
  },
  upcomingEvent:{
    backgroundColor: globalColors.buttonColor,
    borderRadius: 20,
    width: "100%",
    padding: 14
  },
  eventDate:{
    fontSize: 16,
    color: globalColors.textColor,
    fontFamily: "Poppins_600SemiBold",
  },
  eventName:{
    fontSize: 20,
    color: globalColors.textColor,
    fontFamily: "Poppins_600SemiBold",
  }
})