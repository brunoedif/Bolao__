import React, { useState, useContext, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import {
  Image,
  HStack,
  Text,
  Input,
  Pressable,
  Icon,
  Button,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../../context/auth";
import styles from "./styles";
import { Error } from "../../components/Colors";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Login({ navigation, route }) {
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");
  const [show, setShow] = React.useState(false);
  const { showTab, setSignInStatus } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    showTab("none");
  });
  function Login(event) {
    event.preventDefault();
    setLoad(true);

    // Verifique se o email e a senha foram fornecidos
    if (
      email === "" ||
      email === undefined ||
      password === "" ||
      password === undefined
    ) {
      setError("Por favor, insira um email e senha válidos.");
      setLoad(false);
      return;
    }

    const options = {
      method: "POST",
      url: "https://api.rutherles.com/api/login",
      headers: { "Content-Type": "application/json" },
      data: { email: email, password: password },
    };
    axios
      .request(options)
      .then(function (response) {
        console.warn(response.data);
        const value = JSON.stringify(response.data.user[0]);
        AsyncStorage.multiSet([
          ["@user", value],
          ["@isLoggedIn", "true"],
        ]);

        setSignInStatus(true);
        setLoad(false);
      })
      .catch(function (error) {
        console.error(error);
        setError("Email ou senha incorretos.");
        setLoad(false);
      });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image
          alt=""
          source={require("../../../assets/img/logo.png")}
          style={styles.logo}
        />
        <Input
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          autoCapitalize={"none"}
          autoCorrect={false}
          width={"77.77%"}
          height={42}
          returnKeyType="next"
          alignSelf="center"
          variant="underlined"
          keyboardType="email-address"
          fontSize={14}
        />
        <Input
          marginTop={5}
          type={show ? "text" : "password"}
          InputRightElement={
            <Pressable onPress={() => setShow(!show)}>
              <Icon
                as={
                  <MaterialIcons
                    name={show ? "visibility" : "visibility-off"}
                  />
                }
                size={5}
                mr="2"
                color="muted.400"
              />
            </Pressable>
          }
          onChangeText={setPassword}
          onSubmitEditing={Login}
          value={password}
          placeholder="Senha"
          autoCapitalize={"none"}
          autoCorrect={false}
          width={"77.77%"}
          height={42}
          returnKeyType="next"
          alignSelf="center"
          variant="underlined"
          keyboardType="default"
          fontSize={14}
          secure
        />
        {error !== "" ? <Text style={{ color: Error }}>{error}</Text> : <></>}
        {load ? (
          <Button
            style={styles.loginButton}
            isLoading
            isLoadingText="Entrando..."
          ></Button>
        ) : (
          <TouchableOpacity onPress={Login} style={styles.loginButton}>
            <Text style={styles.loginText}>Entrar</Text>
          </TouchableOpacity>
        )}
        <View style={styles.divisor}>
          <View style={styles.divisorLine}></View>
          <Text style={{ marginHorizontal: "3%", color: "#979797" }}>OU</Text>
          <View style={styles.divisorLine}></View>
        </View>

        <View style={styles.forgotContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Reset")}>
            <Text style={styles.forgotText}>Esqueceu sua senha?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Não tem uma conta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Email")}>
            <Text style={styles.signUpButton}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
