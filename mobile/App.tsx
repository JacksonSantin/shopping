import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import { AppLoading } from 'expo';

import {
  Archivo_400Regular,
  Archivo_700Bold,
  useFonts,
} from '@expo-google-fonts/archivo';
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';
import {
  Montserrat_400Regular,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import * as Font from 'expo-font';

import { AuthProvider } from './src/contexts/auth';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  useEffect(() => {
    async function call() {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      });
      setLoading(false);
    }
    call();
  }, []);

  if (!fontsLoaded || loading) {
    return <AppLoading />;
  }

  return (
    <>
      <AuthProvider>
        <NavigationContainer>
          <Routes />
          <StatusBar style="light" />
        </NavigationContainer>
      </AuthProvider>
    </>
  );
}
