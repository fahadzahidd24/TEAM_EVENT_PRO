import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Pressable } from 'react-native'
import { globalColors } from '../../../styles/globalColors'
import Button from '../../../components/button'
import { Dimensions } from 'react-native'
import { Alert } from 'react-native'
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const height = Dimensions.get('window').height
const CELL_COUNT = 6;

const VerificationForgotPassword = ({ navigation }) => {
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const resendHandler = () => {
        Alert.alert("Resend", "Resend", [{ text: "Okay" }]);
    }
    const VerifyHandler = () => {
        navigation.navigate('UserDetails')
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
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Enter Verification Code</Text>
                    <Text style={styles.subText}>6-digit code sent to your phone</Text>
                </View>
                <View style={styles.codeContainer}>
                    <CodeField
                        ref={ref}
                        {...props}
                        value={value}
                        onChangeText={setValue}
                        cellCount={CELL_COUNT}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({ index, symbol, isFocused }) => (
                            <Text
                                key={index}
                                style={[styles.cell, isFocused && styles.focusCell]}
                                onLayout={getCellOnLayoutHandler(index)}>
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        )}
                    />
                </View>

                <View style={styles.signupContainer}>
                    <Text style={styles.signUpText}>Didn't get the code? </Text>
                    <Pressable style={({ pressed }) => { opacity: pressed ? 0.7 : 1 }}
                        onPress={resendHandler}><Text style={styles.signUp}>Resend</Text></Pressable>
                </View>

                <View style={styles.loginContainer}>
                    <Button onPress={VerifyHandler}>Verify</Button>
                </View>
            </ScrollView>
        </KeyboardAvoidingView >
    )
}

export default VerificationForgotPassword

const styles = StyleSheet.create({
    codeFieldRoot: { marginTop: 20 },
    cell: {
        width: 40,
        height: 40,
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
        justifyContent: "center",
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
    loginContainer: {
        width: "100%",
        marginVertical: 20
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

})