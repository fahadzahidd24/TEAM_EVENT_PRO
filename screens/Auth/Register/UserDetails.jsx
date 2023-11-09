import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Input from '../../../components/Input'
import { globalColors } from '../../../styles/globalColors'
import Button from '../../../components/button'
import { Dimensions } from 'react-native'
import { Image } from 'react-native'
import Person from '../../../assets/Person.png'
import { Ionicons } from '@expo/vector-icons'

const height = Dimensions.get('window').height
const UserDetails = ({ navigation }) => {
    const [username, setUsername] = useState('');

    const usernameHandler = () => {
    }

    const ConfirmHandler = () => {
        navigation.navigate('Login')
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
                <View style={styles.pictureContainer}>
                    <Image source={Person} />
                    <View style={styles.pencilCircle}>
                        <Ionicons name="pencil-sharp" size={25} color={globalColors.textColor} />
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <Input icon='person' placeholder='Enter Your Username' onChangeText={usernameHandler} value={username} />
                </View>

                <View style={styles.loginContainer}>
                    <Button onPress={ConfirmHandler}>Confirm</Button>
                </View>
            </ScrollView>
        </KeyboardAvoidingView >
    )
}

export default UserDetails

const styles = StyleSheet.create({
    codeFieldRoot: { marginTop: 20 },
    cell: {
        width: 50,
        height: 50,
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
        justifyContent: "flex-start",
        marginTop: 60,
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
        fontSize: 24,
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
    pencilCircle: {
        backgroundColor: globalColors.buttonColor,
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        left: 90,
        bottom: 60,
    },
    pictureContainer:{
        // width: 150,
        // height: 150,
        borderRadius: 150,
        // backgroundColor: globalColors.buttonColor,
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 30,/
    }

})