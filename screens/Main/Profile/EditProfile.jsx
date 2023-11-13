import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Pressable } from 'react-native'
import { globalColors } from '../../../styles/globalColors'
import Button from '../../../components/button'
import { Dimensions } from 'react-native'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import PoliciesModel from '../../../components/Modal'
import { Image } from 'react-native'
import ProfilePic from '../../../assets/ProfilePic.png'
import { Ionicons } from '@expo/vector-icons';
import Input from '../../../components/Input'

const height = Dimensions.get('window').height
const EditProfile = ({ navigation }) => {

    const backButtonHandler = () => {
        navigation.goBack()
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
                {/* <View style={styles.arrowBackContainer}>
                    
                </View> */}
                <View style={styles.titleContainer}>
                <Pressable style={({ pressed }) => [
                        { opacity: pressed ? 0.7 : 1 }, // Opacity change on press
                    ]} onPress={backButtonHandler}>
                        <Ionicons name="arrow-back" size={24} color={globalColors.buttonColor} />
                    </Pressable>
                    <Text style={styles.title}>Edit Your Profile</Text>
                </View>
                <View style={styles.profilePicContainer}>
                    <View>
                        <Image source={ProfilePic} />
                    </View>
                    <View style={styles.picOptionsContainer}>
                        <Pressable style={styles.uploadPicture}>
                            <Text style={styles.uploadPictureText}>Upload Picture</Text>
                        </Pressable>
                        <Pressable >
                            <Text style={styles.removePictureText}>Remove your picture</Text>
                        </Pressable>
                    </View>
                </View>
                <View style={{ marginVertical: 25, marginHorizontal: 15 }}>
                    <View style={styles.inputContainer}>
                        <Input placeholder='Enter Your Username' editProfile={true} edit={true} value={'Fahad Zahid'} editable={false} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Input placeholder='Enter Your Phone Number' editProfile={true} edit={true} value={'3174632874'} editable={false} defaultInput={"(+92)"} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.changePassText}>Want to change your password?</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Input placeholder='Current Password' editProfile={true} secureTextEntry={true} eye={true} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Input placeholder='New Password' editProfile={true} secureTextEntry={true} eye={true} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Input placeholder='Confirm Password' editProfile={true} secureTextEntry={true} eye={true} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Button>Update</Button>
                    </View>
                    
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default EditProfile;

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalColors.backgroundColor,
        flex: 1,
        // paddingTop: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    innerContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '85%',
    },
    arrowBackContainer: {
        width: '100%',
        alignItems: 'flex-start',
        marginTop: 20,
    },
    title: {
        fontSize: 30,
        fontFamily: 'Poppins_700Bold',
        color: globalColors.buttonColor,
        marginVertical: 20
    },
    profilePicContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
    },
    uploadPicture: {
        backgroundColor: globalColors.buttonColor,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 30
    },
    picOptionsContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    uploadPictureText: {
        fontFamily: 'Poppins_700Bold',
        color: globalColors.textColor,
        fontSize: 16
    },
    removePictureText: {
        color: globalColors.red,
        fontSize: 14,
        fontFamily: "Poppins_400Regular",
        textDecorationLine: 'underline',
        marginTop: 8
    },
    inputContainer: {
        marginVertical: 5,
        // width: '100%',
    },
    changePassText: {
        color: globalColors.buttonColor,
        fontSize: 18,
        fontFamily: "Poppins_600SemiBold",
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        
        width: '80%',
    },
})