import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import StackNavigation from './navigation/Stack';
import { Poppins_500Medium, Poppins_700Bold, Poppins_400Regular, Poppins_600SemiBold, useFonts } from '@expo-google-fonts/dev'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { globalColors } from './styles/globalColors';
import { View } from 'react-native';


export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold
  });
  if (fontsLoaded) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: globalColors.backgroundColor,
        }}
      >
        <StatusBar backgroundColor='transparent' />
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
      </SafeAreaView>
    );
  }
  else {
    return (
      <Text>Loading...</Text>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
