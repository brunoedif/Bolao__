import React, { createContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const navigation = useNavigation();
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [informacoes, setInformacoes] = useState("");
  const [screen, setScreen] = useState("");
  const [login, setLogin] = useState(false);
  const [signedIn, setSignedIn] = useState(true);

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

        ShowTab,
        PutCodigo,

        PutEmail,

        PutSignup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
