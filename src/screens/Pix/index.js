import React from "react";
import { View, TouchableOpacity, SafeAreaView } from "react-native";
import styles from "./styles";
import { useEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/auth";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { Input, Box, Text, Image, Button } from "native-base";
import axios from "axios";
import { BackgroundSecondary } from "../../components/Colors";
import { TextTertiary } from "../../components/Colors";
export default function Pix() {
  const [text, onChangeText] = React.useState("0");
  const [valor, setValor] = React.useState();
  const [user, setUser] = useState([]);
  const navigation = useNavigation();
  const { id, storeDeposito } = useContext(AuthContext);
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

  useEffect(() => {
    // get user data from API
    axios
      .get("https://api.rutherles.com/api/usuario/" + id)
      .then((response) => {
        setUser(response.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function pagar() {
    setLoad(true);
    let deposito_id = Math.floor(Math.random() * 65536) + user.id;

    storeDeposito({
      deposito_id: deposito_id,
      valor: valor ? valor : text,
      user_id: user.id,
    });
    setLoad(false);
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
            <TouchableOpacity onPress={() => saque(100)} style={styles.add}>
              <Text style={styles.addvalue}>+ 100</Text>
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
                bord
                adius={10}
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
