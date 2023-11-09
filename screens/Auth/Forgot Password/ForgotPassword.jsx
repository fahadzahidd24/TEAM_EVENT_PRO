import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Pressable } from 'react-native'
import Input from '../../../components/Input'
import { globalColors } from '../../../styles/globalColors'
import Button from '../../../components/button'
import { Dimensions } from 'react-native'
import { Alert } from 'react-native'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import PoliciesModel from '../../../components/Modal'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

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
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    fontSize: 24,
    textAlignVertical: 'center',
    textAlign: 'center',
    borderWidth: 2,
    borderColor: '#50505080',
    borderRadius: 15,
    marginHorizontal: 10,
  },
  focusCell: {
    borderColor: '#000',
  },
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
  codeContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  inputContainer: {
    marginVertical: 10,
  },
  forgotPassword: {
    marginVertical: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  forgotPasswordText: {
    color: globalColors.buttonColor,
    fontSize: 18,
    fontFamily: 'Poppins_500Medium',
    textDecorationLine: "underline",
  },
  orSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 27,
  },
  line: { flex: 1, height: 1, backgroundColor: globalColors.buttonColor },
  orText: {
    fontSize: 20,
    fontFamily: 'Poppins_500Medium',
    color: "#000000",
    marginHorizontal: 15,
  },
  socialContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  socialButton: {
    marginHorizontal: 15
  },
  loginContainer: {
    width: "100%",
    marginVertical: 10,
    position: 'absolute',
    bottom: 20,
},
  signupContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  signUpText: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    color: globalColors.buttonColor
  },
  signUp: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    color: globalColors.buttonColor,
  },

})