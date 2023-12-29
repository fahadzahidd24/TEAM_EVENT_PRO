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
import Vector from '../../../assets/Vector.png'
import { Ionicons } from '@expo/vector-icons';
// import Input from '../../../components/Input'

const Chat = ({ navigation }) => {
    const route = useRoute();
    const { name } = route.params;
    const messages = [
        {
            messaage: "Going to Schedule an Event",
            sender: 'user', // 'user' or 'other'
            time: 'You 12:02 pm', // 'user' or 'other'
        },
        {
            messaage: "Sure",
            sender: 'other',
            time: 'Ali 12:02 pm', // 'user' or 'other'

        },
        {
            messaage: "Going to Schedule an Event",
            sender: 'user', // 'user' or 'other'
            time: 'You 12:02 pm', // 'user' or 'other'
        },
        {
            messaage: "Sure",
            sender: 'other',
            time: 'Ali 12:02 pm', // 'user' or 'other'

        },
        {
            messaage: "Hello",
            sender: 'user',
            time: 'You 12:02 pm', // 'user' or 'other'

        },
        {
            messaage: "Sure",
            sender: 'other',
            time: 'Ali 12:02 pm', // 'user' or 'other'

        },
        {
            messaage: "Hello",
            sender: 'user',
            time: 'You 12:02 pm', // 'user' or 'other'

        },
        {
            messaage: "Sure",
            sender: 'other',
            time: 'Ali 12:02 pm', // 'user' or 'other'

        },
        {
            messaage: "Sure",
            sender: 'other',
            time: 'Ali 12:02 pm', // 'user' or 'other'

        },


    ];
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
                    { opacity: pressed ? 0.7 : 1 },
                ]} onPress={backButtonHandler}>
                    <Ionicons name="arrow-back" size={24} color={globalColors.textColor} />
                </Pressable>
                <Text style={styles.title}>{name}</Text>
            </View>


            {messages?.map((item, index) => (
                <View
                    key={index}
                    style={[
                        styles.messageContainer,
                        item.sender === 'user' ? styles.userMessage : styles.otherMessage,
                    ]}
                >
                    {
                        item.sender === 'other' && <Image
                            source={ProfilePic}
                            style={[
                                styles.image,
                            ]}
                        />
                    }

                    <View
                        style={{
                            paddingLeft: 10,
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >
                        <Text style={[
                            styles.time,
                            item.sender === 'user' ? styles.invertedWhite : styles.invertedBlack,
                        ]}>{item.time}</Text>

                        <Text style={[
                            item.sender === 'user' ? styles.invertedWhite : styles.invertedBlack,
                        ]}>{item.messaage}</Text>
                    </View>
                    {
                        item.sender === 'user' && <Image
                            source={ProfilePic}
                            style={[
                                styles.image,
                            ]}
                        />
                    }
                </View>
            ))}


            <ScrollView
                contentContainerStyle={styles.innerContainer}
                keyboardShouldPersistTaps="always"
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.chatInput}>
                    <TextInput
                        placeholder={'Type your message...'}
                        placeholderTextColor={'white'}
                        style={styles.input}
                    />
                    <View style={{backgroundColor: globalColors.buttonColor,padding:10, borderRadius:10, marginLeft:2}}>
                        <Ionicons name={'send-sharp'} size={25} color={globalColors.textColor} />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>



    )
}

export default Chat



const styles = StyleSheet.create({
    time: {
        fontSize: 8
    },
    image: {
        width: 35,
        height: 35
    },
    sendIcon: {
        marginLeft: 2,
        marginRight: 5,
        borderRadius: 10,
        backgroundColor: globalColors.buttonColor,
        width: 40,
        height: 40
    },
    imageEnd: {
        alignSelf: 'flex-end',
    },
    imageStart: {
        alignSelf: 'flex-start',
    },
    messageContainer: {
        display: "flex",
        flexDirection: "row",
        maxWidth: '80%',
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
        margin: 10
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: globalColors.buttonColor,
        marginRight: 10
    },
    otherMessage: {
        alignSelf: 'flex-start',
        backgroundColor: 'white',
    },

    messageText: {
        color: 'white',
    },
    invertedBlack: {
        color: "black"
    },
    invertedWhite: {
        color: "white"
    },
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
        // marginLeft: 10,
        // marginRight: 10
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
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        // margin: 10,
        marginHorizontal: 20, // Adjust the margin as needed for responsiveness
        marginVertical: 10
    },
    input: {
        height: 45,
        width: "90%",
        // width: Dimensions.get('screen').width,
        backgroundColor: globalColors.buttonColor,
        fontFamily: 'Poppins_400Regular',
        fontSize: 16,
        color: globalColors.textColor,
        borderRadius: 10,
        paddingHorizontal: 10,

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