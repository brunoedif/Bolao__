import React, { useContext, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  View,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from "react-native";
import { AuthContext } from "../../context/auth";
import { Input, Button } from "native-base";
import styles from "./styles";
import axios from "axios";
export default function Email() {
  const { setEmailAndNavigate, showTab, SetCode } = useContext(AuthContext);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [register, setRegister] = useState(false);
  const [load, setLoad] = useState(false);

  let codigo = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");

  async function SendEmail() {
    if (email == null || name == null) {
      alert("Preencha todos os campos");
    } else {
      setLoad(true);
      try {
        const idResponse = await axios.get(
          "https://api.rutherles.com/api/usuarios",
          {
            headers: { Accept: "application/json" },
          }
        );
        const allUsers = idResponse.data;
        const userId = allUsers.find(
          (user) => user.email.toLowerCase() === email.toLowerCase()
        );

        if (userId) {
          alert("Email já cadastrado");
          setRegister(true);
          setLoad(false);
          return;
        }
      } catch (error) {
        console.error(error);
        alert("Erro ao verificar usuário existente");
        setLoad(false);
        return;
      }

      if (register === false) {
        try {
          const options = {
            method: "GET",
            url:
              "https://morenacaipira.com/public/envioemail.php?" +
              "email=" +
              email +
              "&" +
              "codigo=" +
              codigo +
              "&" +
              "mensagemcadastro=" +
              "Seja bem vindo! ." +
              "&" +
              "usuario=" +
              name +
              "&" +
              "servico=" +
              "Confirmar de cadastro",

            headers: { "Content-Type": "application/json" },
          };

          const emailResponse = await axios.request(options);

          setLoad(false);
          setEmailAndNavigate(email);
          SetCode(codigo);
          console.log(emailResponse);
        } catch (error) {
          console.error(error);
          setLoad(false);
          alert("Erro ao enviar email");
        }
      }
    }
  }
  useEffect(() => {
    showTab("none");
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({
        ios: "padding",
        android: "height",
      })}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} containerInfo>
        <View
          style={StyleSheet.flatten([
            styles.containerInfo,
            Platform.select({
              ios: { marginTop: -10 },
              android: { marginTop: -45 },
            }),
          ])}
        >
          <Image
            alt=""
            source={require("../../../assets/img/email.gif")}
            style={styles.logoMail}
          />
          <Text style={styles.mailTitle}>Vamos começar</Text>
          <Text style={styles.mailSubTitle}>Insira seu Email </Text>

          <Input
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            autoCapitalize={"none"}
            autoCorrect={false}
            width={"77.77%"}
            height={42}
            alignSelf="center"
            variant="underlined"
            keyboardType="email-address"
            returnKeyType="next"
          />

          <Input
            onChangeText={setName}
            value={name}
            placeholder="Seu nome"
            autoCapitalize={"words"}
            autoCorrect={false}
            width={"77.77%"}
            height={42}
            alignSelf="center"
            variant="underlined"
            onSubmitEditing={SendEmail}
            returnKeyType="done"
          />
          {load ? (
            <Button
              style={styles.mailButton}
              isLoading
              isLoadingText="Enviando"
            ></Button>
          ) : (
            <TouchableOpacity onPress={SendEmail} style={styles.mailButton}>
              <Text style={styles.mailText}>Enviar código</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
