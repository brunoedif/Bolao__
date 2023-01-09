import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../screens/Login/index';
import Register from '../screens/Register';
import Email from '../screens/Register/Email';
import Reset from '../screens/Reset/Email';
import Appbar from '../components/Appbar';
import Home from '../screens/Home';
import Search from '../screens/Search';
import Settings from '../screens/Settings';
import Profile from '../screens/Profile';
import Checkout from '../screens/Checkout';
import AddProduct from '../screens/AddProduct';
import Wallet from '../screens/Wallet';
import { BackgroundPrimary, TextSubTitle } from '../components/Colors';

import ProfileInfo from '../screens/Informations';
import Result from '../screens/Result';
import Pix from '../screens/Pix';
import Activity from '../screens/Pix/activity';
import Code from '../screens/Register/Code';

import { AuthContext } from '../context/auth';
import CodeR from '../screens/Reset/Code';

const Stack = createNativeStackNavigator();

export default function Routes() {
  const { isSignedIn } = useContext(AuthContext);

  return (
    <Stack.Navigator>
      {isSignedIn === false || isSignedIn === null ? (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="Email"
            component={Email}
            options={{
              headerBackTitleVisible: false,
              title: 'Cadastro',
              headerStyle: {
                backgroundColor: BackgroundPrimary
              },
              headerTintColor: TextSubTitle,
              headerTitleStyle: {
                fontWeight: 'bold',
                alignSelf: 'center'
              }
            }}
          />
          <Stack.Screen
            name="Code"
            component={Code}
            options={{
              headerBackTitleVisible: false,
              title: 'Cadastro',
              headerStyle: {
                backgroundColor: BackgroundPrimary
              },
              headerTintColor: TextSubTitle,
              headerTitleStyle: {
                fontWeight: 'bold',
                alignSelf: 'center'
              }
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerBackTitleVisible: false,
              title: 'Cadastro',
              headerStyle: {
                backgroundColor: BackgroundPrimary
              },
              headerTintColor: TextSubTitle,
              headerTitleStyle: {
                fontWeight: 'bold',
                alignSelf: 'center'
              }
            }}
          />
          <Stack.Screen
            name="Reset"
            component={Reset}
            options={{
              headerBackTitleVisible: false,
              title: 'Alterar senha',
              headerStyle: {
                backgroundColor: BackgroundPrimary
              },
              headerTintColor: TextSubTitle,
              headerTitleStyle: {
                fontWeight: 'bold',
                alignSelf: 'center'
              }
            }}
          />
          <Stack.Screen
            name="CodeR"
            component={CodeR}
            options={{
              headerBackTitleVisible: false,
              title: 'Alterar senha',
              headerStyle: {
                backgroundColor: BackgroundPrimary
              },
              headerTintColor: TextSubTitle,
              headerTitleStyle: {
                fontWeight: 'bold',
                alignSelf: 'center'
              }
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="Search"
            component={Search}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="Checkout"
            component={Checkout}
            options={{
              headerBackTitleVisible: false,
              title: 'Detalhes do bilhete',
              headerStyle: {
                backgroundColor: BackgroundPrimary
              },
              headerTintColor: TextSubTitle,
              headerTitleStyle: {
                fontWeight: 'bold',
                alignSelf: 'center'
              }
            }}
          />
          <Stack.Screen
            name="ProfileInfo"
            component={ProfileInfo}
            options={{
              headerBackTitleVisible: false,
              title: 'Informações pessoais',
              headerStyle: {
                backgroundColor: BackgroundPrimary
              },
              headerTintColor: TextSubTitle,
              headerTitleStyle: {
                fontWeight: 'bold',
                alignSelf: 'center'
              }
            }}
          />
          <Stack.Screen
            name="Pix"
            component={Pix}
            options={{
              headerBackTitleVisible: false,
              title: 'Adicionar saldo',
              headerStyle: {
                backgroundColor: BackgroundPrimary
              },
              headerTintColor: TextSubTitle,
              headerTitleStyle: {
                fontWeight: 'bold',
                alignSelf: 'center'
              }
            }}
          />
          <Stack.Screen
            name="Activity"
            component={Activity}
            options={{
              headerBackTitleVisible: false,
              title: 'Atividade',
              headerStyle: {
                backgroundColor: BackgroundPrimary
              },
              headerTintColor: TextSubTitle,
              headerTitleStyle: {
                fontWeight: 'bold',
                alignSelf: 'center'
              }
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="AddProduct"
            component={AddProduct}
            options={{
              headerBackTitleVisible: false,
              title: 'Adicionar produto',
              headerStyle: {
                backgroundColor: BackgroundPrimary
              },
              headerTintColor: TextSubTitle,
              headerTitleStyle: {
                fontWeight: 'bold',
                alignSelf: 'center'
              }
            }}
          />
          <Stack.Screen
            name="Wallet"
            component={Wallet}
            options={{
              headerShown: false
            }}
          />

          <Stack.Screen
            name="Result"
            component={Result}
            options={{
              headerBackTitleVisible: false,
              title: 'Resultado',
              headerStyle: {
                backgroundColor: BackgroundPrimary
              },
              headerTintColor: TextSubTitle,
              headerTitleStyle: {
                fontWeight: 'bold',
                alignSelf: 'center'
              }
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
