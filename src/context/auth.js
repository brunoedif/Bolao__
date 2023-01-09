import React, { createContext, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create the auth context to provide auth-related values and functions to its children components
export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [currentScreen, setCurrentScreen] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [id, setId] = useState(null);
  const [deposito, setDeposito] = useState([]);

  //console.error(isSignedIn);
  // check if the user is logged in by checking the value of the '@isLoggedIn' key in AsyncStorage
  const checkIfLoggedIn = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem('@isLoggedIn');
      const user = await AsyncStorage.getItem('@user');

      if (isLoggedIn == 'true') {
        setIsSignedIn(true);
      }
      setId(JSON.parse(user).id);
    } catch (error) {
      setIsSignedIn(true);
    }
  };
  checkIfLoggedIn();

  // remove the '@isLoggedIn' key from AsyncStorage and set isSignedIn to false
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('@isLoggedIn');
      setIsSignedIn(false);
      console.log('User logged out successfully.');
    } catch (error) {
      console.error('Error while logging out:', error);
    }
  };

  // update the currentScreen state variable
  const showTab = (data) => {
    setCurrentScreen(data);
  };

  // update the email state variable and navigate to the 'Code' screen
  const setEmailAndNavigate = (email) => {
    setEmail(email);

    navigation.navigate('Code');
  };

  // update the code state variable
  const SetCode = (code) => {
    setCode(code);
  };

  // update the isSignedIn state variable
  const setSignInStatus = (data) => {
    setIsSignedIn(data);
  };

  // store the provided value in AsyncStorage under the '@deposito' key as a JSON string
  const storeDeposito = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@deposito', jsonValue);
    } catch (e) {}
  };

  const getDeposito = async () => {
    try {
      // Try to retrieve the value from async storage
      const jsonValue = await AsyncStorage.getItem('@deposito');

      // If the value exists, parse it from a JSON string and set it to the deposito state variable
      if (jsonValue != null) {
        setDeposito(JSON.parse(jsonValue));
      }
      // If the value does not exist, set the deposito state variable to an empty array
      else {
        setDeposito([]);
      }
    } catch (e) {
      // If an error occurs while trying to retrieve the value, log the error to the console
      console.error(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        email,
        code,
        getDeposito,
        currentScreen,
        id,
        setEmailAndNavigate,
        SetCode,
        setSignInStatus,
        showTab,
        logout,
        SetCode,
        storeDeposito,
        isSignedIn
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
