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

export function ProfileInfo({ navigation }) {
  const [edit, setEdit] = useState(true);
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
    ShowTab("");
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
          <FlatList
            marginTop={-6}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
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
                      value={value}
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
