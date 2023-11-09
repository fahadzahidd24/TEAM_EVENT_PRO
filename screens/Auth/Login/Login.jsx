import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Pressable } from 'react-native'
import Input from '../../../components/Input'
import { globalColors } from '../../../styles/globalColors'
import Google from '../../../assets/Google.svg'
import Facebook from '../../../assets/Facebook.svg'
import Button from '../../../components/button'
import { Dimensions } from 'react-native'
import { Alert } from 'react-native'
const height = Dimensions.get('window').height
const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const usernameHandler = (text) => {
        setUsername(text);
    }
    const passwordHandler = (pass) => {
        setPassword(pass);
    }

    const LoginHandler = () => {
        Alert.alert("Login", password, [{ text: "Okay" }]);
    }

    const signUpHandler = () => {
        navigation.navigate('Register')
    }

    const forgotPasswordHandler = () => {
        navigation.navigate('ForgotPassword')
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
                <View>
                    <Text style={styles.title}>Login</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Input icon='person' placeholder='Enter Your Username' onChangeText={usernameHandler} value={username} />
                </View>
                <View style={styles.inputContainer}>
                    <Input icon='lock-closed' placeholder='Enter Your Password' onChangeText={passwordHandler} secureTextEntry={true} eye={true} value={password} />
                </View>
                <View style={styles.forgotPassword}>
                    <Pressable onPress={forgotPasswordHandler}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </Pressable>
                </View>
                <View style={styles.orSection}>
                    <View style={styles.line} />
                    <View>
                        <Text style={styles.orText}>or</Text>
                    </View>
                    <View style={styles.line} />
                </View>
                <View style={styles.socialContainer}>
                    <Pressable style={styles.socialButton}>
                        <Google height={30} width={30} />
                    </Pressable>
                    <Pressable style={styles.socialButton}>
                        <Facebook height={30} width={30} />
                    </Pressable>
                </View>
                <View style={styles.loginContainer}>
                    <Button onPress={LoginHandler}>Login</Button>
                </View>
                <View style={styles.signupContainer}>
                    <Text style={styles.signUpText}>Don't have an account? </Text>
                    <Pressable style={({ pressed }) => { opacity: pressed ? 0.7 : 1 }}
                        onPress={signUpHandler}><Text style={styles.signUp}>Signup</Text></Pressable>
                </View>
            </ScrollView>
        </KeyboardAvoidingView >
    )
}

export default Login

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
    }
})