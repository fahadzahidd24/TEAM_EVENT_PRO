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
const NewPassword = ({ navigation, route }) => {
    const { email } = route.params;
    const [loading, setloading] = useState(false);
    const [alertData, setAlertData] = useState({
        alertVisible: false,
        alertMessage: '',
        error: false
    });

    const [formData, setFormData] = useState({
        password: '',
        CPassword: '',
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

    const confirmHandler = async () => {
        if (!formData.password)
            return handleAlert("Please Enter Your Password", true);
        else if (formData.password.length < 6)
            return handleAlert("Please Must be 6 Characters Long", true);
        else if (!formData.CPassword)
            return handleAlert("Please Confirm Your Password", true);
        else if (formData.password !== formData.CPassword)
            return handleAlert("Password and Confirm Password Must Be Same", true);
        else {
            setloading(true);
            try {
                const formData2 = {
                    password: formData.password,
                    email
                }
                console.log(formData2);
                await axios.post(`https://teamevent-pro-backend.vercel.app/api/newPassword`, formData2);
                navigation.navigate("Login");
            } catch (error) {
                handleAlert(error?.response?.data?.message || error.message, true);
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
                    <Text style={styles.title}>Set New Password</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Input icon='lock-closed' placeholder='Enter Your New Password' name='password' handleChange={handleChange} value={formData.password} secureTextEntry={true} eye={true} />
                </View>
                <View style={styles.inputContainer}>
                    <Input icon='lock-closed' placeholder='Confirm Password' name='CPassword' handleChange={handleChange} value={formData.CPassword} secureTextEntry={true} eye={true} />
                </View>
                <View style={styles.loginContainer}>
                    <Button onPress={confirmHandler}>Confirm</Button>
                </View>
            </ScrollView>
        </KeyboardAvoidingView >
    )
}

export default NewPassword

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