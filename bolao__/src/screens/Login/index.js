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
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../../context/auth";
import { useForm, Controller } from "react-hook-form";
import { FontAwesome5 } from "@expo/vector-icons";

import styles from "./styles";

export default function Login({ navigation }) {
  const [show, setShow] = React.useState(false);
  const { ShowTab, screen, PutLogin } = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      login: true,
    },
  });
  function SetLogin(data) {
    if (data.password != "" && data.email != "") {
      PutLogin(data.email, data.login);
    }
  }

  useEffect(() => {
    ShowTab("none");
  });
  screen;
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
        <TouchableOpacity
          onPress={handleSubmit(SetLogin)}
          style={styles.loginButton}
        >
          <Text style={styles.loginText}>Entrar</Text>
        </TouchableOpacity>
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
