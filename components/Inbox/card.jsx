import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { globalColors } from '../../styles/globalColors'
import { Ionicons } from '@expo/vector-icons';

const Card = ({ data, onPress }) => {
    return (
        <Pressable style={styles.container} onPress={onPress.bind(null, data.name)}>
            <View>
                <Text style={styles.nameText}>{data.name}</Text>
                <Text style={styles.events}>{data.events > 0 ? `${data.events} event(s)` : `No event`}</Text>
                <Text style={styles.role}>{data.role}</Text>
            </View>
            <View style={styles.chatIconContainer}>
                <Ionicons size={43} color={globalColors.textColor} name="chatbubble-ellipses" />
            </View>
            {data.messages > 0 && <View style={styles.badge}>
                <Text style={styles.badgeText}>{data.messages}</Text>
            </View>}
        </Pressable>
    )
}

export default Card

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalColors.buttonColor,
        width: "100%",
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 9,
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative',
    },
    nameText: {
        fontSize: 26,
        fontFamily: "Poppins_600SemiBold",
        color: globalColors.textColor,
    },
    events: {
        fontSize: 18,
        fontFamily: "Poppins_600SemiBold",
        color: globalColors.textColor,
    },
    role: {
        fontSize: 20,
        fontFamily: "Poppins_400Regular",
        color: globalColors.textColor,
    },
    chatIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    badge: {
        backgroundColor: globalColors.orange,
        borderRadius: 50,
        position: 'absolute',
        width: 30,
        height: 30,
        top: -10,  // Adjust this value as needed
        right: 0,  // Adjust this value as needed
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: globalColors.textColor,
        fontFamily: "Poppins_600SemiBold",
        fontSize: 18,
    },
})