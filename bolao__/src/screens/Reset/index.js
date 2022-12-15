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
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "./styles";
import { useForm, Controller } from "react-hook-form";
import { Inputs } from "../../components/Inputs";
import { useState, useRef } from "react";
import { AuthContext } from "../../context/auth";

export function Reset() {
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
          <Text style={styles.mailTitle}>Esqueceu a senha?</Text>
          <Text style={styles.mailSubTitle}>
            Não tem problema, insira seu email.
          </Text>
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
export function CodigoReset({ navigation }) {
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

export function Password({ navigation }) {
  const { PutInformacoes, email, ShowTab } = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Nome: "",
      Telefone: "",
      Email: email,
      Senha: "",
      Rsenha: "",
    },
  });
  useEffect(() => {
    ShowTab("none");
  });

  function handleRegister(data) {
    PutInformacoes([data.Nome, data.Telefone, data.Senha, data.Rsenha]);
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

          <Text key={item.keyt} style={styles.infoLabel}>
            {item.label}
          </Text>
          <Controller
            key={item.keyc}
            control={control}
            rules={{
              required: true,
            }}
            name={item.name}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                isDisabled={item.isDisabled}
                key={item.keyi}
                alignSelf={item.alignSelf}
                variant={item.variant}
                marginY={item.marginY}
                marginBottom={item.marginBottom}
                width={item.width}
                height={item.height}
                onChangeText={onChange}
                value={value}
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
          {errors.email && (
            <Text style={{ color: "red", alignSelf: "center" }}>
              Digite seu email.
            </Text>
          )}

          <TouchableOpacity
            onPress={handleSubmit(handleRegister)}
            style={styles.infoButton}
          >
            <Text style={styles.infoText}>Finalizar cadastro</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
