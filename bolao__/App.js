import { StyleSheet, Text, View } from "react-native";
import Routes from "./src/routes/routes";
import { NativeBaseProvider } from "native-base";
import * as Font from "expo-font";
import React from "react";
import AuthProvider from "./src/context/auth";
import { NavigationContainer } from "@react-navigation/native";
import Appbar from "./src/components/Appbar";
import { useContext, useEffect, useState } from "react";

let customFonts = {
  roboto: require("./assets/fonts/Roboto-Light.ttf"),
  "roboto-medium": require("./assets/fonts/Roboto-Medium.ttf"),
  "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  async function loadFontsAsync() {
    await Font.loadAsync(customFonts);
    setFontsLoaded(true);
  }

  useEffect(() => {
    loadFontsAsync();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <AuthProvider>
          <Routes />
          <Appbar />
        </AuthProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
