import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native'
import { globalColors } from '../styles/globalColors'
import { Ionicons } from '@expo/vector-icons'
import { Pressable } from 'react-native'

const Input = ({ icon, canEdit, placeholder, handleChange, secureTextEntry, eye, value, inputMode, defaultInput, maxLength, editProfile, edit, editable = true, name, onEditClick, grey }) => {
    const [secureText, setSecureText] = useState(secureTextEntry);
    const [eyeIcon, setEyeIcon] = useState(eye ? 'eye-off' : '');

    const eyePressHandler = () => {
        setSecureText(!secureText);
        setEyeIcon(eyeIcon === 'eye' ? 'eye-off' : 'eye');
    }
    return (
        <View style={editProfile ? styles.containerWhite : styles.container}>
            <View style={styles.inner}>
                <View style={canEdit === false ? styles.inputContainer2 : styles.inputContainer}>
                    <Ionicons name={icon} size={25} color={globalColors.textColor} />
                    {defaultInput && (
                        <Text style={[editProfile ? styles.defaultInputWhite : styles.defaultInput, !editable && styles.greyColor]}>{defaultInput}</Text>
                    )}
                    <TextInput style={[editProfile ? styles.editInputText : styles.input, !editable && styles.greyColor]} textAlignVertical='center' placeholder={placeholder} placeholderTextColor={editProfile ? globalColors.buttonColor : globalColors.textColor} selectionColor={globalColors.textColor} onChangeText={(text) => handleChange(name, text)} secureTextEntry={secureText ? true : false} value={value} inputMode={inputMode} maxLength={maxLength} editable={editable} />
                </View>
                {eye && (
                    <View style={styles.eyeContainer}>
                        <Pressable onPress={eyePressHandler}>
                            <Ionicons name={eyeIcon} size={25} color={editProfile ? globalColors.buttonColor : globalColors.textColor} />
                        </Pressable>
                    </View>
                )
                }
                {(edit && !editable) && (
                    <View style={styles.editContainer}>
                        <Pressable onPress={onEditClick}>
                            <Text style={styles.editText}>Edit</Text>
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
    greyColor: {
        color: "grey",
    },
    container: {
        backgroundColor: globalColors.buttonColor,
        borderRadius: 10,
        minWidth: "100%",
        maxWidth: "100%",
        maxHeight: 62,
        height: "100%"
    },
    containerWhite: {
        backgroundColor: 'transparent',
        borderRadius: 10,
        minWidth: "100%",
        maxWidth: "100%",
        maxHeight: 62,
        height: "100%",
        borderWidth: 1,
        borderColor: globalColors.buttonColor,
    },
    inputWhite: {
        color: globalColors.buttonColor,
        marginLeft: 15,
        fontSize: 18,
        fontFamily: 'Poppins_500Medium',
        width: "80%",
    },
    inner: {
        paddingLeft: 13,
        paddingVertical: 17,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        overflow: 'hidden'
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "70%",
    },
    inputContainer2: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
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
        height: 30,
        fontFamily: 'Poppins_500Medium',
    },
    defaultInputWhite: {
        color: globalColors.buttonColor,
        fontSize: 18,
        // height: 33,
        fontFamily: 'Poppins_600SemiBold',
    },
    editContainer: {
        marginRight: "5%",
        borderRadius: 10,
        backgroundColor: globalColors.buttonColor,
        width: 51,
        maxWidth: 51,
        height: 30,
        maxHeight: 34,
        alignItems: 'center',
        justifyContent: 'center'
    },
    editText: {
        fontFamily: 'Poppins_600SemiBold',
        color: globalColors.textColor,
        fontSize: 20
    },
    editInputText: {
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold',
        color: globalColors.buttonColor,
        width: "100%",
    }
})