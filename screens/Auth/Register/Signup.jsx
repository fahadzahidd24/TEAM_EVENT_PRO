import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Pressable } from 'react-native'
import Input from '../../../components/Input'
import { globalColors } from '../../../styles/globalColors'
import Button from '../../../components/button'
import { Dimensions } from 'react-native'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import PoliciesModel from '../../../components/Modal'
import Loader from '../../../components/loader'
import axios from 'axios'
import Alert from '../../../components/Alert'
import AlertMessage from '../../../components/Alert'


const height = Dimensions.get('window').height
const Signup = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [name, setname] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [CPassword, setCPassword] = useState('');
  const [agreement, setAgreement] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const nameHandler = (text) => {
    setname(text);
  }
  const phoneHandler = (phone) => {
    setPhone(phone);
  }
  const passwordHandler = (password) => {
    setPassword(password);
  }
  const CPasswordHandler = (CPassword) => {
    setCPassword(CPassword);
  }

  const showAlert = () => {
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
  };

  const SignupHandler = async () => {
    setLoading(true);
    const userDetails = {
      name: name,
      phone: phone,
      password: password,
      CPassword: CPassword,
      agreement: agreement
    }

    if (userDetails.name === '' || userDetails.phone === '' || userDetails.phone.length < 10 || userDetails.password === '' || userDetails.CPassword === '') {
      hideAlert();
      setAlertMessage('Please Enter Valid Details');
      showAlert();
      setLoading(false);
      return;
    }
    else if (userDetails.password !== userDetails.CPassword) {
      setAlertMessage('Password and Confirm Password not matched');
      showAlert();
      setLoading(false);
      return;
    }
    else if (userDetails.agreement === false) {
      setAlertMessage('Please Agree with Terms and Policies');
      showAlert();
      setLoading(false);
      return;
    }

    else {
      try {
        const response = await axios.post('http://192.168.18.84:8080/api/register', userDetails);
        setLoading(false);
        navigation.navigate("Verification")
      }
      catch (err) {
        setLoading(false);
        setAlertMessage(err.response.data.message);
      showAlert();
      }
    }
  }

  const loginHandler = () => {
    navigation.navigate('Login')
  }


  const termsAndPoliciesHandler = () => {
    <PoliciesModel modalVisible={true} />
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
          visible={alertVisible}
          message={alertMessage}
          onPressOk={hideAlert}
        />
        <View>
          <Text style={styles.title}>Signup</Text>
        </View>
        <View style={styles.inputContainer}>
          <Input icon='person' placeholder='Enter Your Name' onChangeText={nameHandler} value={name} />
        </View>
        <View style={styles.inputContainer}>
          <Input icon='call' placeholder='Phone Number' onChangeText={phoneHandler} value={phone} inputMode='numeric' defaultInput="(+92)" maxLength={10} />
        </View>
        <View style={styles.inputContainer}>
          <Input icon='lock-closed' placeholder='Enter Your Password' onChangeText={passwordHandler} value={password} secureTextEntry={true} eye={true} />
        </View>
        <View style={styles.inputContainer}>
          <Input icon='lock-closed' placeholder='Confirm Password' onChangeText={CPasswordHandler} value={CPassword} secureTextEntry={true} eye={true} />
        </View>
        <View style={[styles.inputContainer, styles.checkboxContainer]}>
          <BouncyCheckbox fillColor={globalColors.orange} onPress={(isChecked) => { isChecked ? setAgreement(true) : setAgreement(false) }} />
          <Text style={styles.checkboxText}>I agree with </Text>
          <Pressable onPress={termsAndPoliciesHandler}>
            <Text style={styles.termsAndPolicies}>terms and policies</Text>
          </Pressable>
        </View>


        <View style={styles.loginContainer}>
          <Button onPress={SignupHandler}>Register</Button>
        </View>
        <View style={styles.signupContainer}>
          <Text style={styles.signUpText}>Already have an Account? </Text>
          <Pressable style={({ pressed }) => { opacity: pressed ? 0.7 : 1 }}
            onPress={loginHandler}><Text style={styles.signUp}>Login</Text></Pressable>
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