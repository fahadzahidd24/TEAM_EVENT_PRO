import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native'
import { globalColors } from '../styles/globalColors'
import { Ionicons } from '@expo/vector-icons'
import { Pressable } from 'react-native'

const Input = ({ icon, placeholder, onChangeText, secureTextEntry, eye, value, inputMode, defaultInput, maxLength }) => {
    const [secureText, setSecureText] = useState(secureTextEntry);
    const [eyeIcon, setEyeIcon] = useState(eye ? 'eye-off' : '');

    const eyePressHandler = () => {
        setSecureText(!secureText);
        setEyeIcon(eyeIcon === 'eye' ? 'eye-off' : 'eye');
    }
    return (
        <View style={[styles.container]}>
            <View style={styles.inner}>
                <View style={styles.inputContainer}>
                    <Ionicons name={icon} size={25} color={globalColors.textColor} />
                    {defaultInput && (
                        <Text style={styles.defaultInput}>{defaultInput}</Text>
                    )}
                    <TextInput style={styles.input} textAlignVertical='center' text placeholder={placeholder} placeholderTextColor={globalColors.textColor} selectionColor={globalColors.textColor} onChangeText={onChangeText} secureTextEntry={secureText ? true : false} value={value} inputMode={inputMode} maxLength={maxLength} />
                </View>
                {eye && (
                    <View style={styles.eyeContainer}>
                        <Pressable onPress={eyePressHandler}>
                            <Ionicons name={eyeIcon} size={25} color={globalColors.textColor} />
                        </Pressable>
                    </View>
                )
                }
            </View>
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalColors.buttonColor,
        borderRadius: 10,
        minWidth: "100%",
        maxWidth: "100%",
        maxHeight: 62,
        height: "100%"
    },
    inner: {
        paddingLeft: 13,
        paddingVertical: 17,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "85%",
    },
    input: {
        color: globalColors.textColor,
        marginLeft: 15,
        fontSize: 18,
        fontFamily: 'Poppins_500Medium',
        width: "80%",
    },
    eyeContainer: {
        marginRight: "5%",
    },
    defaultInput: {
        color: globalColors.textColor,
        marginLeft: 15,
        fontSize: 18,
        fontFamily: 'Poppins_500Medium',
    }
})