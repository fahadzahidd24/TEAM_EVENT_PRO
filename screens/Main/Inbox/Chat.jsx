import { useRoute } from '@react-navigation/native';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
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

const Chat = ({ navigation }) => {
    const route = useRoute();
    const { name } = route.params;

    const backButtonHandler = () => {
        navigation.goBack()
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "null"}
            enabled
        >
            <View style={styles.firstOrange}></View>
            <View style={styles.secondOrange}></View>
            <View style={styles.titleContainer}>
                <Pressable style={({ pressed }) => [
                    { opacity: pressed ? 0.7 : 1 }, // Opacity change on press
                ]} onPress={backButtonHandler}>
                    <Ionicons name="arrow-back" size={24} color={globalColors.textColor} />
                </Pressable>
                <Text style={styles.title}>{name}</Text>
            </View>
            <ScrollView
                contentContainerStyle={styles.innerContainer}
                keyboardShouldPersistTaps="always"
                showsVerticalScrollIndicator={false}
            >
                {/* <View style={styles.chatInput}> */}
                    {/* <TextInput style={styles.input} /> */}
                {/* </View> */}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Chat

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalColors.backgroundColor,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: globalColors.buttonColor,
        width: '100%',
        position: 'relative',
        paddingLeft: 10
    },
    innerContainer: {
        flex: 1,
        // borderWidth: 1,
        // borderColor: "black",
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    title: {
        fontSize: 26,
        fontFamily: 'Poppins_600SemiBold',
        color: globalColors.textColor,
        marginVertical: 10,
        marginLeft: 20
    },
    chatInput: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    input: {
        height: 40,
        width: Dimensions.get('screen').width,
        backgroundColor: globalColors.buttonColor,
        fontFamily: 'Poppins_400Regular',
        fontSize: 16,
        color: globalColors.textColor
    },
    firstOrange: {
        backgroundColor: globalColors.lightOrange,
        height: 338,
        width: 338,
        borderRadius: 338,
        position: 'absolute',
        top: -150,
        left: -200,
        opacity: 0.6,
    },
    secondOrange: {
        backgroundColor: globalColors.lightOrange,
        height: 338,
        width: 338,
        borderRadius: 338,
        position: 'absolute',
        bottom: 10,
        right: -250,
        opacity: 0.6,
    },
})