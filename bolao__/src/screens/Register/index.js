import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Plataform,
} from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import {
  Image,
  Center,
  HStack,
  Text,
  Input,
  InputGroup,
  VStack,
  Box,
  FlatList,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "./styles";
import { useForm, Controller } from "react-hook-form";
import { Inputs } from "../../components/Inputs";
import { useState, useRef } from "react";
import { AuthContext } from "../../context/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
export function Email() {
  const { PutEmail, ShowTab } = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });
  function SendEmail(data) {
    PutEmail(data.email);
  }
  useEffect(() => {
    ShowTab("none");
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({
        ios: "padding",
        android: null,
      })}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.containerInfo}>
          <Image
            alt=""
            source={require("../../../assets/img/email.gif")}
            style={styles.logoMail}
          />
          <Text style={styles.mailTitle}>Vamos começar</Text>
          <Text style={styles.mailSubTitle}>Insira seu Email</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onChangeText={onChange}
                value={value}
                placeholder="Email"
                autoCapitalize={false}
                autoCorrect={false}
                width={"77.77%"}
                height={42}
                returnKeyType="next"
                alignSelf="center"
                variant="underlined"
                keyboardType="email-address"
              />
            )}
          />
          {errors.email && (
            <Text style={{ color: "red", alignSelf: "center" }}>
              Digite seu email.
            </Text>
          )}

          <TouchableOpacity
            onPress={handleSubmit(SendEmail)}
            style={styles.mailButton}
          >
            <Text style={styles.mailText}>Enviar código</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
export function Codigo({ navigation }) {
  const { PutCodigo, ShowTab } = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      codigo: "",
    },
  });

  function handlesolicitar(data) {
    PutCodigo(data.codigo);
  }

  const CELL_COUNT = 4;
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  useEffect(() => {
    ShowTab("none");
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({
        ios: "padding",
        android: null,
      })}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.containerMail}>
          <Image
            alt=""
            source={require("../../../assets/img/email.gif")}
            style={styles.logoMail}
          />
          <Text style={styles.CodeTitle}>Continuando...</Text>
          <Text style={styles.CodeSubTitle}>Insira o código que recebeu.</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="codigo"
            render={({ field: { onChange, onBlur, value } }) => (
              <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={onChange}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                  <Text
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}
                  >
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                )}
              />
            )}
          />
          {errors.codigo && (
            <Text style={{ color: "red", alignSelf: "center" }}>
              Digite o código.
            </Text>
          )}

          <TouchableOpacity
            onPress={handleSubmit(handlesolicitar)}
            style={styles.mailButton}
          >
            <Text style={styles.mailText}>Confirmar código</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export function Informacoes({ navigation }) {
  const setToken = async (value) => {
    try {
      await AsyncStorage.setItem("@token", value);
    } catch (e) {}
  };
  const { PutSignup, email, ShowTab } = useContext(AuthContext);
  const [cep, setCep] = useState("");
  const [lop, setLop] = React.useState(true);
  const [address, setAddress] = useState("");
  const [erro, setErro] = React.useState();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      password: "",
      rpassword: "",
      cpf: "",
      date: "",
      email: email,
    },
  });
  useEffect(() => {
    ShowTab("none");
  });
  if (cep.length == 8 && lop) {
    const options = {
      method: "GET",
      url: "http://viacep.com.br/ws/" + cep.replace(/[^0-9]/g, "") + "/json/",
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setAddress(response.data);
        if (response.data.erro == true) {
          setLop(true);
        }
        setLop(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  function handleSignup(data) {
    const setUser = async (value) => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem("@user", jsonValue);
        global.id = jsonValue.id;
      } catch (e) {}
    };

    console.log(data);
    const options = {
      method: "POST",
      url: "https://rutherles.site/api/cadastro",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        telefone: data.phone,
        cpf: data.cpf,
        endereco: address.logradouro,
        cidade: address.localidade,
        nascimento: data.date,
        estado: address.uf,
        cep: cep,
        bairro: address.bairro,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data.user);
        setToken(response.data.token);
        setUser(response.data.user);

        if (cep.length > 7) {
          PutSignup(true);
          navigation.navigate("Home", {
            cadastro: "Usuário cadastrado com sucesso.",
          });
        } else {
          alert("Por favor digite um CEP Válido");
        }
      })
      .catch(function (error) {
        console.error(error);
        setErro("Email já cadastrado");
      });
  }
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({
        ios: "padding",
        android: null,
      })}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.containerInfo}>
          <View style={styles.textInfoView}>
            <Text style={styles.infoTitle}>Agora vamos te conhecer</Text>
            <Text style={styles.infoSubTitle}>
              Precisamos de algumas informações.
            </Text>
          </View>

          <FlatList
            showsVerticalScrollIndicator={false}
            w={"77%"}
            data={Inputs}
            renderItem={({ item }) => (
              <Box py={1}>
                <Text style={styles.infoLabel}>{item.label}</Text>
                <Controller
                  key={item.key}
                  control={control}
                  rules={{
                    required: true,
                  }}
                  name={item.name}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      isDisabled={item.isDisabled}
                      alignSelf={item.alignSelf}
                      variant={item.variant}
                      marginY={item.marginY}
                      marginBottom={item.marginBottom}
                      height={item.height}
                      onChangeText={item.name == "cep" ? setCep : onChange}
                      value={
                        item.name == "cep"
                          ? cep
                          : item.name == "address"
                          ? address.logradouro
                          : item.name == "state"
                          ? address.uf
                          : item.name == "city"
                          ? address.localidade
                          : item.name == "district"
                          ? address.bairro
                          : value
                      }
                      placeholder={item.label}
                      autoCapitalize={item.auto}
                      autoCorrect={false}
                      returnKeyType={item.returnKeyType}
                      type={item.type}
                      keyboardType={item.keyboardType}
                      secureTextEntry={item.secury}
                    />
                  )}
                />
              </Box>
            )}
          />
          <TouchableOpacity
            onPress={handleSubmit(handleSignup)}
            style={styles.infoButton}
          >
            <Text style={styles.infoText}>Finalizar cadastro</Text>
          </TouchableOpacity>
          {errors.email && (
            <Text style={{ color: "red", alignSelf: "center" }}>
              Digite seu email.
            </Text>
          )}
          {errors.email && (
            <Text style={{ color: "red", alignSelf: "center" }}>
              Digite seu email.
            </Text>
          )}
          {errors.phone && (
            <Text style={{ color: "red", alignSelf: "center" }}>
              Digite seu telefone.
            </Text>
          )}
          {errors.name && (
            <Text style={{ color: "red", alignSelf: "center" }}>
              Digite seu nome.
            </Text>
          )}
          {errors.password && (
            <Text style={{ color: "red", alignSelf: "center" }}>
              Digite sua senha.
            </Text>
          )}
          {errors.rpassword && (
            <Text style={{ color: "red", alignSelf: "center" }}>
              Digite a confirmação da senha.
            </Text>
          )}
          {errors.cpf && (
            <Text style={{ color: "red", alignSelf: "center" }}>
              Digite seu cpf.
            </Text>
          )}
          {errors.date && (
            <Text style={{ color: "red", alignSelf: "center" }}>
              Digite sua data de nascimento.
            </Text>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
