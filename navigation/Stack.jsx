import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Auth/Login/Login';
import Signup from '../screens/Auth/Register/Signup';
import ForgotPassword from '../screens/Auth/Forgot Password/ForgotPassword';
import Verification from '../screens/Auth/Register/Verification';
import UserDetails from '../screens/Auth/Register/UserDetails';
import VerificationForgotPassword from '../screens/Auth/Forgot Password/Verification';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../screens/Main/Profile/Profile';
import EditProfile from '../screens/Main/Profile/EditProfile';
import Home from '../screens/Main/Home/Home';
import Inbox from '../screens/Main/Inbox/Inbox';
import AddButton from '../components/AddButton/AddButton';
import { Ionicons } from '@expo/vector-icons';
import { globalColors } from '../styles/globalColors';
import Chat from '../screens/Main/Inbox/Chat';
import CalendarScreen from '../screens/Main/Calendar/Calendar';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuth, setUser } from '../store/auth-slice';
import Loader from '../components/loader';
import NewPassword from '../screens/Auth/Forgot Password/newPassword';

const BottomTabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ProfileStack = () => {
    return (
        <Stack.Navigator screenOptions={{ animation: 'default', headerShown: false }}>
            <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
    );
};

const BottomTabsNavigation = () => {
    return (
        <BottomTabs.Navigator
            initialRouteName='HomeBottomTab'
            sceneContainerStyle={{ backgroundColor: 'transparent' }}
            screenOptions={{
                tabBarActiveTintColor: globalColors.orange,
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
                headerStyle: styles.header,
                headerTitle: () => (
                    <View style={styles.headerContainer}>
                        <View style={styles.headerTitle}>
                            <Text style={styles.teameventText}>TEAMEVENT</Text>
                            <Text style={styles.proText}>PRO</Text>
                        </View>
                        <View>
                            <Ionicons name="notifications" size={24} color={globalColors.textColor} />
                        </View>
                    </View>
                ),
            }}
        >
            <BottomTabs.Screen
                name="HomeBottomTab"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name="home"
                            color={focused ? globalColors.orange : globalColors.textColor}
                            size={30}
                        />
                    ),
                }}
            />
            <BottomTabs.Screen
                name="Inbox"
                component={Inbox}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name="ios-chatbubble-ellipses"
                            color={focused ? globalColors.orange : globalColors.textColor}
                            size={30}
                        />
                    ),
                }}
            />
            <BottomTabs.Screen
                name="AddButtonBottomTab"
                component={AddButton}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name="add-circle-outline"
                            color={focused ? globalColors.orange : globalColors.textColor}
                            size={50}
                        />
                    ),
                }}
            />
            <BottomTabs.Screen
                name="Calendar"
                component={CalendarScreen}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name="calendar"
                            color={focused ? globalColors.orange : globalColors.textColor}
                            size={30}
                        />
                    ),
                }}
            />
            <BottomTabs.Screen
                name="ProfileBottomTab"
                // component={Profile}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name="person"
                            color={focused ? globalColors.orange : globalColors.textColor}
                            size={30}
                        />
                    ),
                }}
                children={ProfileStack}
            />
        </BottomTabs.Navigator>
    );
};


const ForgotPasswordStack = () => {
    return (
        <Stack.Navigator screenOptions={{ animation: 'slide_from_right', headerShown: false }}>
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="VerificationForgotPassword" component={VerificationForgotPassword} />
            <Stack.Screen name="NewPassword" component={NewPassword} />
        </Stack.Navigator>
    );
};

const RegisterStack = () => {
    return (
        <Stack.Navigator screenOptions={{ animation: 'slide_from_right', headerShown: false }} initialRouteName='Signup' >
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Verification" component={Verification} />
            <Stack.Screen name="UserDetails" component={UserDetails} />
        </Stack.Navigator>
    );
};

const StackNavigation = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.auth.isAuth);
    const [authState, setAuthState] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem('token');
            let user = await AsyncStorage.getItem('user');
            user = JSON.parse(user);
            if (token && user) {
                dispatch(setAuth(true));
                dispatch(setUser(user));
            }
            setAuthState(true);
        }
        checkAuth();
    }, []);


    if (!authState) {
        return <Loader />;
    }

    return (
        <Stack.Navigator screenOptions={{ animation: 'slide_from_right', headerShown: false }} >
            {
                !isAuth ? (
                    <>
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Register" component={RegisterStack} />
                        <Stack.Screen name="ForgotPasswordStack" component={ForgotPasswordStack} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="BottomTabs" component={BottomTabsNavigation} />
                        <Stack.Screen name="EditProfile" component={EditProfile} options={{ animation: "fade" }} />
                        <Stack.Screen name="Chat" component={Chat} options={{ animation: "fade_from_bottom" }} />
                    </>
                )
            }
        </Stack.Navigator>
    );
};

export default StackNavigation;

const styles = StyleSheet.create({
    tabBar: {
        height: 100,
        borderTopEndRadius: 50,
        borderTopStartRadius: 50,
        backgroundColor: globalColors.buttonColor,
    },
    header: {
        backgroundColor: globalColors.buttonColor,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    headerTitle: {
        flexDirection: 'row',
    },
    teameventText: {
        color: globalColors.textColor,
        fontSize: 24,
        marginRight: 5,
        fontFamily: "Poppins_400Regular",
    },
    proText: {
        color: globalColors.orange,
        fontSize: 24,
        fontFamily: "Poppins_700Bold",
    },
});
