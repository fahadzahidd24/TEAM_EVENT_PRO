import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Auth/Login/Login';
import Signup from '../screens/Auth/Register/Signup';
import ForgotPassword from '../screens/Auth/Forgot Password/ForgotPassword';
import Verification from '../screens/Auth/Register/Verification';
import UserDetails from '../screens/Auth/Register/UserDetails';
import VerificationForgotPassword from '../screens/Auth/Forgot Password/Verification';

const Stack = createNativeStackNavigator();

const ForgotPasswordStack = () => {
    return (
        <Stack.Navigator screenOptions={{ animation: 'slide_from_right', headerShown: false }}>
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="VerificationForgotPassword" component={VerificationForgotPassword} />
        </Stack.Navigator>
    );
};

const RegisterStack = () => {
    return (
        <Stack.Navigator screenOptions={{ animation: 'slide_from_right', headerShown: false }}>
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Verification" component={Verification} />
            <Stack.Screen name="UserDetails" component={UserDetails} />
        </Stack.Navigator>
    );
};

const StackNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ animation: 'slide_from_right', headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={RegisterStack} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordStack} />
        </Stack.Navigator>
    );
};

export default StackNavigation;

const styles = StyleSheet.create({});
