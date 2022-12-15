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
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "./styles";
import { useForm, Controller } from "react-hook-form";
import { Inputs } from "../../components/Inputs";
import { useState, useRef } from "react";
import { AuthContext } from "../../context/auth";
import { MaskedTextInput } from "react-native-mask-text";
import { BackgroundSecondary } from "../../components/Colors";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
export function ProfileInfo({ navigation }) {
  const [edit, setEdit] = useState(true);
  const { PutInformacoes, email, ShowTab } = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rpassword: "",
      cep: "",
      adress: "",
      date: "",
      cpf: "",
      city: "",
      district: "",
      state: "",
    },
  });
  useEffect(() => {
    ShowTab("none");
  });

  function handleRegister(data) {
    PutInformacoes([data.Nome, data.Telefone, data.Senha, data.Rsenha]);
  }

  const [user, setUser] = React.useState();
  const [loader, setloader] = React.useState(false);
  const [loop, setLoop] = useState(false);
  let users = "";

  if (loader) {
    users = JSON.parse(user);
  }
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("@user");
        if (value !== null) {
          setUser(value);
          setloader(true);
          setLoop(true);
        }
      } catch (e) {
        // error reading value
      }
    };

    getData();
  });

  var data = {};
  if (loop) {
    users.forEach(function (item) {
      for (var i in item) {
        data[i] = item[i];
      }
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
          <FlatList
            showsVerticalScrollIndicator={false}
            w={"77%"}
            data={Inputs}
            renderItem={({ item }) => (
              <Box py={2}>
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
                      isDisabled={edit}
                      key={item.keyi}
                      alignSelf={item.alignSelf}
                      variant={item.variant}
                      marginY={item.marginY}
                      marginBottom={item.marginBottom}
                      height={item.height}
                      onChangeText={onChange}
                      value={data[item.name]}
                      placeholder={item.placeholder}
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

          {edit == true ? (
            <TouchableOpacity
              onPress={() => setEdit(false)}
              style={styles.infoButton}
            >
              <Text ml={4} style={styles.infoText}>
                Editar
              </Text>
              <MaterialIcons
                style={{ marginLeft: 10, color: BackgroundSecondary }}
                name="edit"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleSubmit(handleRegister)}
              style={styles.infoButton}
            >
              <Text style={styles.infoText}>Salvar</Text>
            </TouchableOpacity>
          )}

          {errors.email && (
            <Text style={{ color: "red", alignSelf: "center" }}>
              Digite seu email.
            </Text>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
