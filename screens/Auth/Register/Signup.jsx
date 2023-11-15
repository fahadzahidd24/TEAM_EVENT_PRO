import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Pressable } from 'react-native'
import Input from '../../../components/Input'
import { globalColors } from '../../../styles/globalColors'
import Button from '../../../components/button'
import { Dimensions } from 'react-native'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Loader from '../../../components/loader'
import axios from 'axios'
import AlertMessage from '../../../components/Alert'


const height = Dimensions.get('window').height
const Signup = ({ navigation }) => {
  const [loading, setloading] = useState(false);
  const [alertData, setAlertData] = useState({
    alertVisible: false,
    alertMessage: '',
    error: false
  });

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    CPassword: '',
    agreement: false,
  })

  const handleChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

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

  const SignupHandler = async () => {
    if (!formData.name)
      return handleAlert("Please Enter Your Name");
    else if (!formData.phone || formData.phone.length !== 10)
      return handleAlert("Please Enter Valid Phone Number", true);
    else if (!formData.password)
      return handleAlert("Please Enter Your Password", true);
    else if (formData.password.length < 6)
      return handleAlert("Please Must be 6 Characters Long", true);
    else if (!formData.CPassword)
      return handleAlert("Please Confirm Your Password", true);
    else if (formData.password !== formData.CPassword)
      return handleAlert("Password and Confirm Password Must Be Same", true);
    else if (!formData.agreement)
      return handleAlert("Please Agree With Terms and Policies", true);
    else {
      setloading(true);
      try {
        await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/api/register/checkNumber`, { phone: formData.phone });
        navigation.navigate("Verification", { phone: formData.phone, password: formData.password, name: formData.name });
      } catch (error) {
        handleAlert(error.response.data.message, true);
      } finally {
        setloading(false);
      }
    }
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
        <View>
          <Text style={styles.title}>Signup</Text>
        </View>
        <View style={styles.inputContainer}>
          <Input icon='person' placeholder='Enter Your Name' name={'name'} handleChange={handleChange} value={formData.name} />
        </View>
        <View style={styles.inputContainer}>
          <Input icon='call' placeholder='Phone Number' name='phone' handleChange={handleChange} value={formData.phone} inputMode='numeric' defaultInput="(+92)" maxLength={10} />
        </View>
        <View style={styles.inputContainer}>
          <Input icon='lock-closed' placeholder='Enter Your Password' name='password' handleChange={handleChange} value={formData.password} secureTextEntry={true} eye={true} />
        </View>
        <View style={styles.inputContainer}>
          <Input icon='lock-closed' placeholder='Confirm Password' name='CPassword' handleChange={handleChange} value={formData.CPassword} secureTextEntry={true} eye={true} />
        </View>
        <View style={[styles.inputContainer, styles.checkboxContainer]}>
          <BouncyCheckbox fillColor={globalColors.orange} onPress={(isChecked) => { isChecked ? handleChange("agreement", true) : handleChange("agreement", false) }} />
          <Text style={styles.checkboxText}>I agree with </Text>
          <Pressable >
            <Text style={styles.termsAndPolicies}>terms and policies</Text>
          </Pressable>
        </View>


        <View style={styles.loginContainer}>
          <Button onPress={SignupHandler}>Register</Button>
        </View>
        <View style={styles.signupContainer}>
          <Text style={styles.signUpText}>Already have an Account? </Text>
          <Pressable style={({ pressed }) => { opacity: pressed ? 0.7 : 1 }}
            onPress={() => navigation.navigate("Login")}><Text style={styles.signUp}>Login</Text></Pressable>
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
    alignItems: "flex-start",
    flexGrow: 1,
    height: height - 0.1 * height,
  },
  title: {
    color: globalColors.buttonColor,
    fontSize: 35,
    fontFamily: 'Poppins_700Bold',
  },
  inputContainer: {
    marginVertical: 10,
  },
  loginContainer: {
    width: "100%",
    marginTop: "20%",
    marginVertical: 10
  },
  signupContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
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
    textDecorationLine: "underline",
  },
  checkboxContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  checkboxText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: globalColors.buttonColor,
  },
  termsAndPolicies: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
  }
})