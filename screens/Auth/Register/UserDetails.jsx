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
    inputContainer: {
        marginVertical: 10,
    },
    loginContainer: {
        width: "100%",
        marginVertical: 10,
        position: 'absolute',
        bottom: 20,
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
        borderRadius: 150,
        justifyContent: 'center',
        alignItems: 'center',
    }
})