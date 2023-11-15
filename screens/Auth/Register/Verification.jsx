import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import Button from '../../../components/button';
import { globalColors } from '../../../styles/globalColors';
import { Dimensions } from 'react-native';
import Loader from '../../../components/loader';
import AlertMessage from '../../../components/Alert';
import axios from 'axios';

const height = Dimensions.get('window').height;
const CELL_COUNT = 6;

const Verification = ({ navigation, route }) => {
    const { phone, password, name } = route.params;
    const [loading, setloading] = useState(false);
    const [value, setValue] = useState('');
    const [alertData, setAlertData] = useState({
        alertVisible: false,
        alertMessage: '',
        error: false
    });
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const [timer, setTimer] = useState(59);

    const startTimer = () => {
        setTimer(59);
    };

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [timer]);

    const resendHandler = async() => {
        try {
            startTimer();
            const response = await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/api/register/resendOTP`, { phone, otp: value })
            if (response.status === 200) {
                return;
            }
            else
                return handleAlert(response.data.message, true);
        } catch (error) {
            handleAlert(error.response.data.message, true);
        } finally {
            setloading(false);
        }
    };

    const VerifyHandler = async () => {
        if (value.length !== CELL_COUNT) {
            return handleAlert('Please fill all the cells', false);
        } else {
            setloading(true);
            try {
                const response = await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/api/register/verifyOTP`, { phone, otp: value })
                if (response.status === 200) {
                    return navigation.replace('UserDetails', { phone, password, name });
                }
                else
                    return handleAlert(response.data.message, true);
            } catch (error) {
                handleAlert(error.response.data.message, true);
            } finally {
                setloading(false);
            }
        }

    };

    const handleAlert = (message, error) => {
        setAlertData({
            alertVisible: true,
            alertMessage: message,
            error: error
        });
    };

    const hideAlert = () => {
        setAlertData({
            alertVisible: false,
            alertMessage: '',
        });
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'null'}
            enabled
        >
            <ScrollView
                contentContainerStyle={styles.innerContainer}
                keyboardShouldPersistTaps="always"
                showsVerticalScrollIndicator={false}
            >
                {loading && <Loader />}
                <AlertMessage
                    visible={alertData.alertVisible}
                    message={alertData.alertMessage}
                    error={alertData.error}
                    onPressOk={hideAlert}
                />
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
                                onLayout={getCellOnLayoutHandler(index)}
                            >
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        )}
                    />
                </View>

                <View style={styles.signupContainer}>
                    <View style={styles.signUpText}>
                        <Text style={styles.signUpText2}>
                            Didn't get the code?{' '}
                        </Text>
                        {timer > 0 ? (
                            <Text style={styles.timerText}>{`Resend in ${timer} seconds`}</Text>
                        ) : (
                            <Pressable
                                style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
                                onPress={resendHandler}
                            >
                                <Text style={styles.signUp}>Resend</Text>
                            </Pressable>
                        )}
                    </View>
                </View>

                <View style={styles.loginContainer}>
                    <Button onPress={VerifyHandler}>Verify</Button>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Verification;

const styles = StyleSheet.create({
    // ... other styles
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
        justifyContent: "center"
    },
    signUpText: {
        fontSize: 16,
        fontFamily: 'Poppins_500Medium',
        color: globalColors.buttonColor,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    signUpText2: {
        fontSize: 16,
        fontFamily: 'Poppins_500Medium',
        color: globalColors.buttonColor,
    },
    signUp: {
        fontSize: 16,
        fontFamily: 'Poppins_700Bold',
        color: globalColors.buttonColor,
    },
    timerText: {
        fontSize: 16,
        fontFamily: 'Poppins_500Medium',
        color: globalColors.buttonColor,
    },
});
