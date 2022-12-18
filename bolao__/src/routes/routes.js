import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "../screens/Login/index";
import { Email, Código, Codigo, Informacoes } from "../screens/Register";
import Appbar from "../components/Appbar";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Settings from "../screens/Settings";
import Profile from "../screens/Profile";
import Checkout from "../screens/Checkout";
import AddProduct from "../screens/AddProduct";
import Wallet from "../screens/Wallet";
import { BackgroundPrimary, TextSubTitle } from "../components/Colors";
import { Reset } from "../screens/Reset";
import { AuthContext } from "../context/auth";
import { ProfileInfo } from "../screens/Informations";
import Result from "../screens/Result";
import Pix from "../screens/Pix";
import Activity from "../screens/Pix/activity";

const Stack = createNativeStackNavigator();

export default function Routes() {
  const { signedIn } = useContext(AuthContext);

  return (
    <Stack.Navigator>
      {signedIn == false ? (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
              title: "Perfil",
            }}
          />

          <Stack.Screen
            name="Email"
            component={Email}
            options={{
              headerShown: false,
              title: "Perfil",
            }}
          />
          <Stack.Screen
            name="Codigo"
            component={Codigo}
            options={{
              headerShown: false,
              title: "Perfil",
            }}
          />
          <Stack.Screen
            name="Informacoes"
            component={Informacoes}
            options={{
              headerShown: false,
              title: "Perfil",
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
              title: "Perfil",
            }}
          />

          <Stack.Screen
            name="Search"
            component={Search}
            options={{
              headerShown: false,
              title: "Perfil",
            }}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{
              headerShown: false,
              title: "Perfil",
            }}
          />
          <Stack.Screen
            name="Checkout"
            component={Checkout}
            options={{
              headerBackTitleVisible: false,

              title: "Detalhes do bilhete",
              headerStyle: {
                backgroundColor: BackgroundPrimary,
              },
              headerTintColor: TextSubTitle,

              headerTitleStyle: {
                fontWeight: "bold",
                alignSelf: "center",
              },
            }}
          />
          <Stack.Screen
            name="ProfileInfo"
            component={ProfileInfo}
            options={{
              headerBackTitleVisible: false,

              title: "Informações pessoais",
              headerStyle: {
                backgroundColor: BackgroundPrimary,
              },
              headerTintColor: TextSubTitle,

              headerTitleStyle: {
                fontWeight: "bold",
                alignSelf: "center",
              },
            }}
          />
          <Stack.Screen
            name="Pix"
            component={Pix}
            options={{
              headerBackTitleVisible: false,

              title: "Adicionar saldo",
              headerStyle: {
                backgroundColor: BackgroundPrimary,
              },
              headerTintColor: TextSubTitle,

              headerTitleStyle: {
                fontWeight: "bold",
                alignSelf: "center",
              },
            }}
          />
          <Stack.Screen
            name="Activity"
            component={Activity}
            options={{
              headerBackTitleVisible: false,

              title: "Adicionar saldo",
              headerStyle: {
                backgroundColor: BackgroundPrimary,
              },
              headerTintColor: TextSubTitle,

              headerTitleStyle: {
                fontWeight: "bold",
                alignSelf: "center",
              },
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerShown: false,
              title: "Perfil",
            }}
          />
          <Stack.Screen
            name="Result"
            component={Result}
            options={{
              headerShown: false,
              title: "Perfil",
            }}
          />
          <Stack.Screen
            name="AddProduct"
            component={AddProduct}
            options={{
              headerBackTitleVisible: false,
              title: "Criar Grupo",
            }}
          />
          <Stack.Screen
            name="Wallet"
            component={Wallet}
            options={{
              headerShown: false,
              title: "Perfil",
            }}
          />
          <Stack.Screen
            name="Reset"
            component={Reset}
            options={{
              headerShown: false,
              title: "Perfil",
            }}
          />
          <Stack.Screen
            name="CodigoReset"
            component={Reset}
            options={{
              headerShown: false,
              title: "Perfil",
            }}
          />
          <Stack.Screen
            name="Password"
            component={Reset}
            options={{
              headerShown: false,
              title: "Perfil",
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
