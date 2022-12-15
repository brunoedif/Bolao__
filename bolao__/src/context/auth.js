import React, { createContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const navigation = useNavigation();
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [informacoes, setInformacoes] = useState("");
  const [screen, setScreen] = useState("");
  const [login, setLogin] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState("");
  const [pedido, setPedido] = useState([]);

  const [jogada, setJogada] = useState([]);
  const [user_email, setUser_email] = useState([]);
  const [select, setSelect] = useState([]);
  const [texto, setTexto] = useState("Atualizando");
  const [onPedido, setonePedido] = useState();
  const [getaposta, setGetaposta] = useState([]);
  const [jogada_id, setJogada_id] = useState("");
  const [deposito, setDeposito] = useState([]);
  const [user_id, setUser_id] = useState("");

  const [url, setUrl] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("@user");
        if (value !== null) {
          setSignedIn(true);
        }
      } catch (e) {
        // error reading value
      }
    };

    getData();
  });

  function ShowTab(screen) {
    setScreen(screen);
  }

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

  function PutSignup(signup) {
    if (signup) {
      setSignedIn(true);
    }
  }
  function PutsignedIn(signedIn) {
    if (signedIn == true) {
      setSignedIn(true);
    } else if (signedIn == false) {
      setSignedIn(false);
    }
  }

  function getUser(data) {
    const options = {
      method: "GET",
      url: "https://morenacaipira.com/api/usuario/" + data,
      headers: { Accept: "application/json" },
    };

    axios

      .request(options)
      .then(function (response) {
        setUser(response.data[0]);
      })
      .catch(function (error) {});
  }
  console.error(user);
  return (
    <AuthContext.Provider
      value={{
        signedIn,
        login,
        screen,
        codigo,
        informacoes,
        role,
        email,
        signedIn,
        user,
        ShowTab,
        PutCodigo,
        PutsignedIn,
        PutEmail,
        getUser,
        PutSignup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
