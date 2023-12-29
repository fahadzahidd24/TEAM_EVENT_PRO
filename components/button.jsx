import { Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';
import { globalColors } from '../styles/globalColors';

const Button = ({ onPress, children, background }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed ? 0.7 : 1, backgroundColor: background ? background : globalColors.buttonColor, }, // Opacity change on press
      ]}
      onPress={onPress}
    >
      <Text style={styles.textColour}>{children}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    minWidth: '100%',
    // backgroundColor: globalColors.buttonColor,
    height: 62,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textColour: {
    color: globalColors.textColor,
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
  },
});
