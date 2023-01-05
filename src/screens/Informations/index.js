import React, { useContext, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { Text, Box, Button, ScrollView, Input, Image } from "native-base";
import styles from "./styles";
import { useState, useRef } from "react";
import { AuthContext } from "../../context/auth";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { BackgroundSecondary } from "../../components/Colors";

export default function ProfileInfo({ navigation }) {
  const { id, showTab } = useContext(AuthContext);
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [erro, setErro] = React.useState();
  const [load, setLoad] = useState(false);
  const [telefone, setTelefone] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRPassword] = useState("");
  const isFocused = useIsFocused();
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [numero, setNumero] = useState("");
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [edit, setEdit] = useState(true);
  useEffect(() => {
    if (isFocused) showTab("none");
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

  useEffect(() => {
    if (user) {
      const options = {
        method: "GET",
        url: `http://viacep.com.br/ws/${cep.replace(/[^0-9]/g, "")}/json/`,
      };

      axios
        .request(options)
        .then(function (response) {
          setAddress(response.data);
          if (response.data.erro) {
          } else {
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [cep]);
  useEffect(() => {
    if (user) {
      setNome(user.nome);
      setCpf(user.cpf);
      setTelefone(user.telefone);
      setCep(user.cep);
      setLogradouro(user.logradouro);
      setBairro(user.bairro);
      setCidade(user.cidade);
      setEstado(user.estado);
      setNumero(user.numero);
      setEmail(user.email);
    } else if (edit === false) {
      setNome("");
      setCpf("");
      setTelefone("");
      setCep("");
      setLogradouro("");
      setBairro("");
      setCidade("");
      setEstado("");
      setNumero("");
      setEmail("");
    }
  }, [user]);

  function Register() {
    setLoad(true);

    if (password !== rpassword || password === "" || password === undefined) {
      setErro("As senhas não coincidem.");
      setLoad(false);
    } else {
      const options = {
        method: "PUT",
        url: "https://api.rutherles.com/api/usuario/" + id,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          nome: nome.trim(),
          email: email.toLowerCase().trim(),
          telefone: telefone.trim(),
          cpf: cpf.trim(),
          endereco: address.logradouro + " ," + address.bairro + " ," + numero,
          cidade: address.localidade,
          estado: address.uf,
          cep: cep,
          password: password.trim(),
        },
      };

      axios
        .request(options)
        .then(function (response) {
          console.error(response.data);
          if (response.data) {
            setLoad(false);
            alert("Usuário atualizado com sucesso.");
            setLoad(false);
            setEdit(true);
          } else {
            alert("Por favor digite um CEP Válido");
            setLoad(false);
          }
        })
        .catch(function (error) {
          setErro("Dados já cadastrados");
          setLoad(false);
        });
    }
  }
  if (user === null) {
    return (
      <Box
        flex={1}
        alignItems={"center"}
        justifyContent={"center"}
        backgroundColor={BackgroundSecondary}
      >
        <Image alt="" source={require("../../../assets/img/load.gif")} />
      </Box>
    );
  } else {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.select({
          ios: "padding",
          android: null,
        })}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView showsVerticalScrollIndicator={false} width="100%">
            <View style={styles.containerInfo}>
              <Box py={2} alignSelf={"center"}>
                <Text style={styles.infoLabel}>Email</Text>

                <Input
                  variant="underlined"
                  isDisabled={true}
                  value={email}
                  onChangeText={email}
                  width="77.7%"
                  autoCapitalize="nome"
                  autoComplete="off"
                  placeholder="Digite seu email"
                  keyboardType="email-address"
                />
              </Box>
              <Box py={2} alignSelf={"center"}>
                <Text style={styles.infoLabel}>Telefone</Text>

                <Input
                  isDisabled={edit}
                  value={telefone}
                  onChangeText={setTelefone}
                  width="77.7%"
                  autoCapitalize="nome"
                  autoComplete="off"
                  placeholder="Digite seu telefone"
                  keyboardType="phone-pad"
                  variant="underlined"
                />
              </Box>
              <Box py={2} alignSelf={"center"}>
                <Text style={styles.infoLabel}>Nome</Text>

                <Input
                  isDisabled={edit}
                  variant="underlined"
                  value={nome}
                  onChangeText={setNome}
                  width="77.7%"
                  autoCapitalize="nome"
                  autoComplete="off"
                  placeholder="Digite seu nome"
                />
              </Box>
              <Box py={2} alignSelf={"center"}>
                <Text style={styles.infoLabel}>Cpf</Text>

                <Input
                  isDisabled={true}
                  variant="underlined"
                  value={cpf}
                  onChangeText={setCpf}
                  width="77.7%"
                  autoCapitalize="nome"
                  autoComplete="off"
                  placeholder="Digite seu cpf"
                  keyboardType="numeric"
                />
              </Box>

              <Box py={2} alignSelf={"center"}>
                <Text style={styles.infoLabel}>Cep</Text>

                <Input
                  isDisabled={edit}
                  variant="underlined"
                  value={cep}
                  onChangeText={setCep}
                  width="77.7%"
                  autoCapitalize="nome"
                  autoComplete="off"
                  placeholder="Digite seu cep"
                  keyboardType="numeric"
                />
              </Box>
              <Box py={2} alignSelf={"center"}>
                <Text style={styles.infoLabel}>Endereço</Text>

                <Input
                  isDisabled={edit}
                  variant="underlined"
                  value={
                    cep.length >= 8
                      ? address.logradouro + " ," + address.bairro
                      : ""
                  }
                  onChangeText={setLogradouro}
                  width="77.7%"
                  autoCapitalize="nome"
                  autoComplete="off"
                  placeholder="Digite seu endereço"
                />
              </Box>
              <Box py={2} alignSelf={"center"}>
                <Text style={styles.infoLabel}>Cidade</Text>

                <Input
                  isDisabled={edit}
                  variant="underlined"
                  value={address.localidade}
                  onChangeText={setCidade}
                  width="77.7%"
                  autoCapitalize="nome"
                  autoComplete="off"
                  placeholder="Digite sua cidade"
                />
              </Box>
              <Box py={2} alignSelf={"center"}>
                <Text style={styles.infoLabel}>Estado</Text>

                <Input
                  isDisabled={edit}
                  variant="underlined"
                  value={address.uf}
                  onChangeText={setEstado}
                  width="77.7%"
                  autoCapitalize="nome"
                  autoComplete="off"
                  placeholder="Digite seu estado"
                />
              </Box>
              <Box py={2} alignSelf={"center"}>
                <Text style={styles.infoLabel}>Número</Text>

                <Input
                  isDisabled={edit}
                  variant="underlined"
                  value={numero}
                  onChangeText={setNumero}
                  width="77.7%"
                  autoCapitalize="nome"
                  autoComplete="off"
                  placeholder="Digite seu número"
                />
              </Box>

              <Box py={2} alignSelf={"center"}>
                <Text style={styles.infoLabel}>Senha</Text>

                <Input
                  isDisabled={edit}
                  variant="underlined"
                  value={password}
                  onChangeText={setPassword}
                  width="77.7%"
                  autoCapitalize="nome"
                  autoComplete="off"
                  secureTextEntry={true}
                  placeholder="Digite sua senha"
                />
              </Box>
              <Box py={2} alignSelf={"center"}>
                <Text style={styles.infoLabel}>Repita sua senha</Text>

                <Input
                  isDisabled={edit}
                  variant="underlined"
                  value={rpassword}
                  onChangeText={setRPassword}
                  width="77.7%"
                  autoCapitalize="nome"
                  autoComplete="off"
                  secureTextEntry={true}
                  placeholder="Digite sua senha"
                />
              </Box>
              {load ? (
                <Button
                  style={styles.infoButton}
                  isLoading
                  isLoadingText="Salvando..."
                ></Button>
              ) : (
                <TouchableOpacity
                  style={styles.infoButton}
                  onPress={() => {
                    edit ? setEdit(false) : Register();
                  }}
                >
                  <Text style={styles.infoText}>
                    {edit ? "Editar" : "Salvar"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}
