import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Input from '../../../components/Input'
import { globalColors } from '../../../styles/globalColors'
import Button from '../../../components/button'
import { Dimensions } from 'react-native'

const height = Dimensions.get('window').height
const Signup = ({ navigation }) => {
  const [phone, setPhone] = useState('');

  const VerifyHandler = () => {
    navigation.navigate('VerificationForgotPassword')
  }
  const phoneHandler = (phone) => {
    setPhone(phone);
  }



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
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Forgot your Password?</Text>
          <Text style={styles.subText}>Enter the phone number</Text>
        </View>
        <View style={styles.inputContainer}>
          <Input icon='call' placeholder='Enter Your Phone Number' onChangeText={phoneHandler} value={phone} inputMode='numeric' defaultInput="(+92)" maxLength={10} />
        </View>

        <View style={styles.loginContainer}>
          <Button onPress={VerifyHandler}>Reset</Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView >
  )
}

export default Signup

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: globalColors.backgroundColor
  },
  innerContainer: {
    width: "85%",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    height: height - 0.1 * height,
  },
  titleContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    color: globalColors.buttonColor,
    fontSize: 32,
    fontFamily: 'Poppins_700Bold',
  },
  subText: {
    color: globalColors.buttonColor,
    fontSize: 20,
    fontFamily: 'Poppins_400Regular',
  },
  inputContainer: {
    marginVertical: 10,
  },
  loginContainer: {
    width: "100%",
    marginVertical: 10,
    position: 'absolute',
    bottom: 20,
  },
})