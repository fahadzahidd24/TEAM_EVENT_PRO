import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Pressable } from 'react-native'
import Input from '../../../components/Input'
import { globalColors } from '../../../styles/globalColors'
import Button from '../../../components/button'
import { Dimensions } from 'react-native'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import PoliciesModel from '../../../components/Modal'
import { Image } from 'react-native'
import ProfilePic from '../../../assets/ProfilePic.png'
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { setAuth } from '../../../store/auth-slice'

const height = Dimensions.get('window').height
const Profile = ({ navigation }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const editProfileHandler = () => {
        navigation.navigate('EditProfile')
    }

    const logoutHandler = async () => {
        await AsyncStorage.clear();
        dispatch(setAuth(false));
    }

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Your Profile</Text>
                </View>
                <View style={styles.profilePicContainer}>
                    {
                        !user.profilePicture ?
                            <Image source={ProfilePic} />
                            :
                            <Image style={{ width: 150, height: 150 }} source={{ uri: user.profilePicture }} />
                    }
                </View>
                <View style={styles.profileInfoContainer}>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.phone}>{user.email}</Text>
                </View>
                <View style={styles.lineContainer} >
                    <View style={styles.line} />
                </View>
                <View style={styles.buttonsContainer}>
                    <Pressable style={({ pressed }) => [styles.button,
                    { opacity: pressed ? 0.7 : 1 }, // Opacity change on press
                    ]} onPress={editProfileHandler}>
                        <Ionicons name="pencil" size={24} color={globalColors.buttonColor} />
                        <Text style={styles.buttonText}>Edit Your Profile</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={logoutHandler}>
                        <Ionicons name="log-out" size={24} color={globalColors.buttonColor} />
                        <Text style={styles.buttonText}>Logout</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalColors.backgroundColor,
        flex: 1,
        paddingTop: 10,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    innerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '85%',
    },
    title: {
        fontSize: 30,
        fontFamily: 'Poppins_700Bold',
        color: globalColors.buttonColor,
        marginVertical: 20
    },
    profileInfoContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    name: {
        fontSize: 24,
        fontFamily: 'Poppins_700Bold',
        color: globalColors.buttonColor,
        marginTop: 20
    },
    phone: {
        fontSize: 22,
        fontFamily: 'Poppins_500Medium',
        color: globalColors.buttonColor,
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    lineContainer: {
        width: "100%",
        marginTop: 27,
    },
    line: {
        width: "100",
        height: 5,
        backgroundColor: globalColors.buttonColor,
    },
    buttonsContainer: {
        width: '100%',
        marginTop: 20,
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        marginVertical: 7,
    },
    buttonText: {
        fontSize: 22,
        fontFamily: 'Poppins_500Medium',
        color: globalColors.buttonColor,
        marginLeft: 10,
        marginTop: 3
    },
    profilePicContainer: {
        width: 150,
        height: 150,
        borderRadius: 75,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    }
})