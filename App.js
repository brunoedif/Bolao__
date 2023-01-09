import Routes from './src/routes/routes';
import { NativeBaseProvider } from 'native-base';
import * as Font from 'expo-font';
import React from 'react';
import AuthProvider from './src/context/auth';
import { NavigationContainer } from '@react-navigation/native';
import Appbar from './src/components/Appbar';
import { useEffect, useState } from 'react';
import { SWRConfig } from 'swr/_internal';

import * as SplashScreen from 'expo-splash-screen';
import { func } from './src/screens/Home/components/consts';

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function prepare() {
      try {
        // keeps the splash screen visible while assets are cached
        await SplashScreen.preventAutoHideAsync();

        // pre-load/cache assets: images, fonts, and videos
        await func.loadAssetsAsync();
      } catch (e) {
        // console.warn(e);
      } finally {
        // loading is complete
        setIsLoading(false);
      }
    }

    prepare();
  }, []);

  React.useEffect(() => {
    // when loading is complete
    if (isLoading === false) {
      // hide splash function
      const hideSplash = async () => SplashScreen.hideAsync();

      // hide splash screen to show app
      hideSplash();
    }
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  return (
    <SWRConfig>
      <NativeBaseProvider value={{ signed: true }}>
        <NavigationContainer>
          <AuthProvider>
            <Routes />
            <Appbar />
          </AuthProvider>
        </NavigationContainer>
      </NativeBaseProvider>
    </SWRConfig>
  );
}
