import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/auth";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { Input, Stack, Box, Text, Image, Button } from "native-base";
import {
  PrimaryFontFamily,
  SecondaryFontFamily,
  TertiaryFontFamily,
} from "../../components/FontFamily";
import { PrimaryFontSize, TertiaryFontSize } from "../../components/FontSize";
import {
  BackgroundPrimary,
  BackgroundSecondary,
  Primary,
  Shaddow,
  TextTertiary,
} from "../../components/Colors";
import axios from "axios";
export default function Pix() {
  const [text, onChangeText] = React.useState("0");
  const [valor, setValor] = React.useState();
  const logo = require("../../../assets/img/pix.png");
  const navigation = useNavigation();
  const { user, storeDeposito, getDeposito } = useContext(AuthContext);
  function saque(value) {
    setValor(value);
  }

  const [load, setLoad] = useState(false);
  const {
    control,
    handleSubmit,

    formState: { errors },
  } = useForm({
    defaultValues: {
      valor: "",
    },
  });

  function pagar() {
    let deposito_id = Math.floor(Math.random() * 65536) + user.id;

    storeDeposito({
      deposito_id: deposito_id,
      valor: valor ? valor : text,
      user_id: user.id,
    });

    navigation.navigate("Activity", {
      valor: valor ? valor : text,
      deposito_id: deposito_id,
      deposito_id_tabela: "77",
      carteira: user.carteira,
      user_id: user.id,
      nome: user.nome,
      cep: user.cep,
      endereco: user.endereco,
      cidade: user.cidade,
      estado: user.estado,
      cpf: user.cpf,
      email: user.email,
    });
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: BackgroundSecondary,
          justifyContent: "center",
        }}
      >
        <Box marginTop={5}>
          <Image
            alt=""
            mb={"10%"}
            width={175}
            height={60}
            alignSelf={"center"}
            source={require("../../../assets/img/pix.png")}
          />
          <Text
            bold
            fontSize="lg"
            mb="2"
            color={TextTertiary}
            alignSelf={"center"}
          >
            Insira o valor que deseja adicionar
          </Text>

          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <Text
              bold
              fontSize="sm"
              mb="4"
              color={TextTertiary}
              alignSelf={"flex-start"}
            >
              Valores a partir de R$ 1,00
            </Text>
          </View>
          <View style={{}}>
            <Text
              style={{
                marginTop: 20,
                fontSize: 22,
                alignSelf: "center",
                color: TextTertiary,
                justifyContent: "center",
                borderBottomColor: TextTertiary,
                borderBottomWidth: 1,
              }}
            >
              R$ {valor ? valor : text} ,00
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 20,
            }}
          >
            <TouchableOpacity onPress={() => saque(10)} style={styles.add}>
              <Text style={styles.addvalue}>+ 10</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => saque(50)} style={styles.add}>
              <Text style={styles.addvalue}>+ 50</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => saque(carteira)}
              style={styles.add}
            >
              <Text style={styles.addvalue}>Total</Text>
            </TouchableOpacity>
          </View>
          <Text
            bold
            fontSize="sm"
            mb="4"
            color={TextTertiary}
            alignSelf={"center"}
          >
            Outros valores
          </Text>

          <Controller
            control={control}
            rules={{
              required: false,
            }}
            name="valor"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                alignSelf={"center"}
                borderRadius={10}
                height={50}
                width={"40%"}
                backgroundColor={BackgroundSecondary}
                borderWidth={1}
                borderColor={"#1AB563"}
                color={"#1AB563"}
                fontSize={20}
                bold={true}
                keyboardType="numeric"
                InputLeftElement={
                  <Text paddingLeft={3} fontSize="xl" color={"#1AB563"}>
                    R$
                  </Text>
                }
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholderTextColor={TextTertiary}
              />
            )}
          />

          {errors.valor && (
            <Text style={{ color: "red" }}>Digite o valor.</Text>
          )}

          {load ? (
            <Button
              style={styles.loginButton}
              isLoading
              isLoadingText="Solicitando..."
            ></Button>
          ) : (
            <TouchableOpacity
              onPress={handleSubmit(pagar)}
              style={styles.loginButton}
            >
              <Text style={styles.loginText}>Adicionar</Text>
            </TouchableOpacity>
          )}
        </Box>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  add: {
    backgroundColor: Primary,
    width: 80,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  addvalue: { color: "#fff", fontSize: 22, fontWeight: "600" },
  retirar: {
    backgroundColor: Primary,
    width: "70%",
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    alignSelf: "center",
  },
  LoginV: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BackgroundSecondary,
    width: "90%",
    height: "90%",
    borderRadius: 20,
    elevation: 3,
    shadowColor: Shaddow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    alignSelf: "center",
  },
  input: {
    height: 40,
    width: "50%",
    margin: 12,
    borderWidth: 0,
  },
  btnSubmit: {
    backgroundColor: "#0ed830",
    width: "50%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    marginTop: 20,
    marginBottom: "25%",
  },
  btnSubmitText: {
    color: TextTertiary,
  },
  btnRegister: {
    marginTop: 10,
  },
  RegisterText: {
    color: TextTertiary,
    fontWeight: "bold",
  },
  valor: {
    fontFamily: SecondaryFontFamily,
    fontSize: TertiaryFontSize,
  },
  valorFixo: {
    backgroundColor: "#0ed830",
    width: 60,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
  },
  fixo: {
    color: TextTertiary,
    textAlign: "center",

    marginTop: "auto",
    marginBottom: "auto",
    fontFamily: SecondaryFontFamily,
    fontSize: TertiaryFontSize,
  },
  title1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",

    textAlign: "center",
    color: "#000",
  },
  iconRight: {
    fontSize: 20,
    marginLeft: 20,
    marginRight: -35,

    color: "#000",
  },
  loginButton: {
    marginTop: 15,
    backgroundColor: Primary,
    width: "77.71%",
    height: 42,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: "15%",
  },
  loginText: {
    color: BackgroundSecondary,
  },
});
