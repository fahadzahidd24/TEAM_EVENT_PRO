import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../screens/Main/Profile/Profile';
import Calendar from '../screens/Main/Calendar/Calendar';
import Inbox from '../screens/Main/Inbox/Inbox';
import Home from '../screens/Main/Home/Home';
import AddButton from '../components/AddButton/AddButton';
import { globalColors } from '../styles/globalColors';
import { Ionicons } from '@expo/vector-icons';
import EditProfile from '../screens/Main/Profile/EditProfile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const BottomTabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ProfileStack = () => {
    return (
        <Stack.Navigator screenOptions={{ animation: 'default', headerShown: false }}>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="EditProfile" component={EditProfile} options={{  }} />
        </Stack.Navigator>
    );
};

const MainNavigation = () => {
    return (
        <BottomTabs.Navigator
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
                name="InboxBottomTab"
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
                component={Calendar}
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
                //    component={Profile}
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
        color: globalColors.textColor, // Set the color for "TEAMEVENT"
        fontSize: 24,
        marginRight: 5,
        fontFamily: "Poppins_400Regular",
    },
    proText: {
        color: globalColors.orange, // Set the color for "PRO"
        fontSize: 24,
        fontFamily: "Poppins_700Bold",
    },
});

export default MainNavigation;
