import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import StackNavigation from './navigation/Stack';
import { Poppins_300Light, Poppins_500Medium, Poppins_700Bold, Poppins_400Regular, Poppins_600SemiBold, useFonts } from '@expo-google-fonts/dev'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { globalColors } from './styles/globalColors';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Provider, useDispatch } from 'react-redux';
import store from './store/store';
import { setAuth } from './store/auth-slice';


export default function App() {
  

  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold
  });
  if (fontsLoaded) {
    return (
      <Provider store={store}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: globalColors.backgroundColor,
          }}
        >
          <StatusBar backgroundColor={globalColors.backgroundColor} style='dark' />
          <NavigationContainer>
            <StackNavigation />
          </NavigationContainer>
        </SafeAreaView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
