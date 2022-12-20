import React, { createContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getLocalUser } from "../../services/asyncStorage";
import { useToken } from "native-base";
import api from "../components/hooks/api";
export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [screen, setScreen] = useState("");
  const [signedIn, setSignedIn] = useState(true);
  const [useras, setUseras] = useState([]);
  const [bilhete, setBilhete] = useState("");
  const [loading, setloading] = useState(false);
  const [myUser, setMyUser] = useState("");
  const [userLocal, setUserLocal] = useState("");
  const { id } = getLocalUser();
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");

  if (id) {
    setSignedIn(true);
  }
  //get user //
  useEffect(() => {
    function GetUser() {
      const options = {
        method: "GET",
        url: "https://rutherles.site/api/usuario/" + id,
        headers: { "Content-Type": "application/json" },
      };

      axios
        .request(options)
        .then(function (response) {
          setUser(response.data);
          storeDeposito(response.data.deposito);
        })
        .catch(function (error) {});
    }

    GetUser();
  }, [id]);

  // ----- //

  //get bilhete //
  useEffect(() => {
    const options = {
      method: "POST",
      url: "https://rutherles.site/api/compras",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: { user_id: id },
    };

    axios
      .request(options)
      .then(function (response) {
        setBilhete(response.data.compra);
      })
      .catch(function (error) {});
    setloading(false);
  }, [id]);
  // --- //

  //show tab //
  function ShowTab(screen) {
    setScreen(screen);
  }
  // --- //

  //signup //
  function PutEmail(email) {
    setEmail(email);
    if (email) {
      navigation.navigate("Codigo");
    }
  }

  function PutCodigo(codigo) {
    setCodigo(codigo);
    if (codigo) {
      navigation.navigate("Informacoes");
    }
  }

  // --- //

  function PutsignedIn(signedIn) {
    if (signedIn == true) {
      setSignedIn(true);
    } else if (signedIn == false) {
      setSignedIn(false);
    }
  }
  const storeDeposito = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@deposito", jsonValue);
    } catch (e) {}
  };

  return (
    <AuthContext.Provider
      value={{
        signedIn,
        codigo,
        bilhete,
        email,
        signedIn,
        user,
        screen,

        ShowTab,
        PutCodigo,
        PutsignedIn,
        PutEmail,

        storeDeposito,

        userLocal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
