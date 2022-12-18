import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import {
  Image,
  Center,
  HStack,
  Text,
  Input,
  InputGroup,
  VStack,
  Pressable,
  Icon,
  Button,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../../context/auth";
import { useForm, Controller } from "react-hook-form";
import { FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";

export default function Login({ navigation, route }) {
  const [load, setLoad] = useState(false);
  const { cadastro } = route.params ? route.params : "";
  const [token, setToken] = useState();
  const [erro, setErro] = useState();
  const [show, setShow] = React.useState(false);
  const { ShowTab, screen, PutsignedIn } = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    ShowTab("none");
  });
  screen;

  function handleSignin(data) {
    setLoad(true);
    const storeUser = async (value) => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem("@user", jsonValue);
      } catch (e) {}
    };

    const setToken = async (value) => {
      try {
        await AsyncStorage.setItem("@token", value);
      } catch (e) {}
    };
    function SignedIn() {
      PutsignedIn(true);
    }
    const options = {
      method: "POST",
      url: "https://rutherles.site/api/login",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: { email: data.email, password: data.password },
    };

    axios
      .request(options)
      .then(function (response) {
        storeUser(response.data.user);
        global.id = response.data.user.id;
        setToken(response.data.authorisation.token);
        SignedIn();
        setLoad(false);
      })

      .catch(function (error) {
        console.error("n foi");
        setLoad(false);
        setErro("Email ou senha incorretos");
      });
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("@token");
        if (value !== null) {
          setToken(value);
          storeUser();
        }
      } catch (e) {
        // error reading value
      }
    };

    const storeStart = async (value) => {
      try {
        await AsyncStorage.setItem("@start", "true");
      } catch (e) {}
    };

    getData();
    storeStart();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image
          alt=""
          source={require("../../../assets/img/logo.png")}
          style={styles.logo}
        />
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
              fontSize={14}
            />
          )}
        />
        {errors.email && (
          <Text style={{ color: "red", alignSelf: "center" }}>
            Digite seu email.
          </Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
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
              onChangeText={onChange}
              value={value}
              placeholder="Senha"
              autoCapitalize={false}
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
          )}
        />
        {errors.email && (
          <Text style={{ color: "red", alignSelf: "center" }}>
            Digite seu email.
          </Text>
        )}

        {load ? (
          <Button
            style={styles.loginButton}
            isLoading
            isLoadingText="Entrando..."
          ></Button>
        ) : (
          <TouchableOpacity
            onPress={handleSubmit(handleSignin)}
            style={styles.loginButton}
          >
            <Text style={styles.loginText}>Entrar</Text>
          </TouchableOpacity>
        )}

        <View style={styles.divisor}>
          <View style={styles.divisorLine}></View>
          <Text style={{ marginHorizontal: "3%", color: "#979797" }}>OU</Text>
          <View style={styles.divisorLine}></View>
        </View>
        <HStack space={8} alignItems={"baseline"} mb={2} mt={2}>
          <TouchableOpacity style={styles.social}>
            <Image
              style={styles.socialIcons}
              alt=""
              source={require("../../../assets/img/g.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.social}>
            <Image
              style={styles.socialIcons}
              alt=""
              source={require("../../../assets/img/f.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.social}>
            <Image
              style={styles.socialIcons}
              alt=""
              source={require("../../../assets/img/a.png")}
            />
          </TouchableOpacity>
        </HStack>
        <View style={styles.forgotContainer}>
          <TouchableOpacity>
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
