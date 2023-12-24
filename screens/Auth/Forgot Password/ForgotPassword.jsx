import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Input from '../../../components/Input'
import { globalColors } from '../../../styles/globalColors'
import Button from '../../../components/button'
import { Dimensions } from 'react-native'
import Loader from '../../../components/loader'
import AlertMessage from '../../../components/Alert'
import axios from 'axios';

const height = Dimensions.get('window').height
const Signup = ({ navigation }) => {
  const [loading, setloading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
  })
  const [alertData, setAlertData] = useState({
    alertVisible: false,
    alertMessage: '',
    error: false
  });

  const VerifyHandler = async () => {
    if (!formData.email)
      return handleAlert("Please Enter Valid Email", true);
    setloading(true);
    try {
      await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/api/forgotPassword`, { email: formData.email });
      navigation.navigate('VerificationForgotPassword', { email: formData.email })
    } catch (error) {
      handleAlert(error?.response?.data?.message || error.message, true);
    } finally {
      setloading(false);
    }
  }

  const handleAlert = (message, error) => {
    setAlertData({
      alertVisible: true,
      alertMessage: message,
      error: error
    });
  };

  const hideAlert = () => {
    setAlertData({
      alertVisible: false,
      alertMessage: '',
    });
  };

  const handleChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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
        {loading && <Loader />}
        <AlertMessage
          visible={alertData.alertVisible}
          message={alertData.alertMessage}
          error={alertData.error}
          onPressOk={hideAlert}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Forgot your Password?</Text>
          <Text style={styles.subText}>Enter the Email Address</Text>
        </View>
        <View style={styles.inputContainer}>
          <Input icon='mail' placeholder='Enter Your Email' name={'email'} handleChange={handleChange} value={formData.email} />
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