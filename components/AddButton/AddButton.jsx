import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View, TextInput, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { globalColors } from '../../styles/globalColors'
import Button from "../button"
import Vector from "../../assets/Vector_m.png"
import VectorSent from "../../assets/Vector.png"
import DropDownPicker from 'react-native-dropdown-picker';

const height = Dimensions.get('window').height
const AddButton = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' }
  ]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "null"}
      enabled
    >
      <ScrollView
        contentContainerStyle={styles.innerContainer}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.mainContainer}>
          <View style={[styles.commonColor, styles.EventInfo]}>
            <Text style={styles.heading}>Event's Info</Text>
            <View>
              <TextInput
                style={[
                  styles.input,
                  { height: 60 },
                ]}
                placeholderTextColor="white"
                placeholder="Event's Title"
              />

              <View style={[
                styles.input,
                { height: 45, display: "flex", flexDirection: "row" },
              ]}>
                <Image
                  source={VectorSent}
                  style={[
                    styles.VectorSent,
                  ]}
                />
                <TextInput

                  placeholderTextColor="white"
                  placeholder="Enter event's location"
                />
              </View>


              <TextInput
                style={[
                  styles.input,
                  { height: 45 },
                ]}
                placeholderTextColor="white"
                placeholder="Enter event's location"
              />

              <View style={{ display: "flex", flexDirection: "row" }}>
                <TextInput
                  style={[
                    styles.input,
                    { width: "70%" },
                  ]}
                  placeholderTextColor="white"
                  placeholder="Add Event's Description"
                />
                <View
                  style={[
                    { marginLeft: 10, width: "25%", display: "flex", justifyContent: "center" },
                  ]}
                >
                  <Image
                    source={Vector}
                    style={[
                      styles.image,
                    ]}
                  />
                  <TextInput
                    style={[
                      styles.input,
                      { height: 45 },
                    ]}
                    placeholderTextColor="white"
                    placeholder="0"
                  />

                </View>
              </View>
            </View>
          </View>
          <Button background={"#DC9135"}>CONFIRM</Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView >
  )
}

export default AddButton

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: globalColors.backgroundColor
  },
  innerContainer: {
    width: "85%",
    // justifyContent: "center",
    // alignItems: "flex-start",
    // flexGrow: 1,
    height: height - 0.1 * height,
  },
  mainContainer: {
    // marginHorizontal: 30,
    // height: "100%",
    display: "flex",
    justifyContent: "space-around"
  },


  picker: {
    backgroundColor: 'white', // Set background color to white
    color: 'black', // Set text color to black (for better visibility on white background)
  },
  heading: {
    fontSize: 25,
    color: "white"
  },
  input: {
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 10,
    // width: '100%',
    marginTop: 15,
    paddingLeft: 8,
    paddingRight: 8,
    color: "white",
  },
  image: {
    marginTop: 15,
    alignSelf: "center",
    width: 42,
    height: 30
  },
  VectorSent: {
    width: 17,
    height: 15,
    alignSelf: "center",
    marginRight: 10
  },

  commonColor: {
    backgroundColor: globalColors.buttonColor,
    borderRadius: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  EventInfo: {
    height: "75%",
    paddingHorizontal: 20,
    paddingVertical: 20,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  ConfirmBtn: {
    height: "15%",
    borderRadius: 15,
  }
})


{/* <View style={[styles.commonColor, styles.EventInfo]}>
            <Text style={styles.heading}>Event's Info</Text>
            <TextInput
              style={[
                styles.input,
                { height: 60 },
              ]}
              placeholderTextColor="white"
              placeholder="Event's Title"
            />

            <TextInput
              style={[
                styles.input,
                { height: 45 },
              ]}
              placeholderTextColor="white"
              placeholder="Enter event's location"
            />

            <DropDownPicker
              style={[
                styles.input,
                { height: 45, backgroundColor: 'transparent', },
              ]}
              placeholder="Select group(s) for event"
              placeholderStyle={{ color: 'white' }}
              items={items}
              setItems={setItems}
              value={value}
              setValue={setValue}
              open={open}
              setOpen={setOpen}
            />

            <View style={{ display: "flex", flexDirection: "row", height: 100 }}>
              <TextInput
                style={[
                  styles.input,
                  { width: "70%" },
                ]}
                placeholderTextColor="white"
                placeholder="Add Event's Description"
              />
              <View
                style={[
                  { marginLeft: 5, width: "20%", display: "flex", alignItems: "center", justifyContent: "center" },
                ]}
              >
                <Image
                  source={ProfilePic}
                  style={[
                    styles.image,
                  ]}
                />
                <TextInput
                  style={[
                    styles.input,
                    { height: 45 },
                  ]}
                  placeholderTextColor="white"
                  placeholder="0"
                />
              </View>
            </View>

          </View > */}