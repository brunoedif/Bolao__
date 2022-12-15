import { Box, Text, Center, Avatar, HStack, Stack, Divider } from "native-base";
import React, { useContext, useEffect } from "react";
import { View, SafeAreaView, TouchableOpacity } from "react-native";
import styles from "./styles";
import {
  MaterialIcons,
  AntDesign,
  Ionicons,
  Entypo,
  FontAwesome,
} from "@expo/vector-icons";
import {
  BackgroundSecondary,
  Error,
  Primary,
  TextTertiary,
} from "../../components/Colors";
import { AuthContext } from "../../context/auth";
import { BackgroundPrimary } from "../../components/Colors";
import { useIsFocused } from "@react-navigation/native";
export default function Settings({ navigation }) {
  const { ShowTab, PutLogout } = useContext(AuthContext);
  const login = false;

  useEffect(() => {
    if (isFocused) {
      ShowTab("visible");
    }
  });
  function Logout() {
    PutLogout(login);
  }
  const isFocused = useIsFocused();
  return (
    <SafeAreaView style={styles.Container}>
      <Box style={styles.card} backgroundColor={BackgroundSecondary}>
        <Avatar
          mt={4}
          alignSelf={"center"}
          borderWidth={3}
          borderColor={Primary}
          size="lg"
          source={{
            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          }}
        />
        <Box style={styles.avatar}>
          <Text style={styles.name}>
            &nbsp; Bruno Matheus &nbsp;
            <Text style={styles.star}>
              5 <AntDesign name="star" color={"gold"} />
            </Text>
          </Text>
        </Box>

        <HStack style={styles.header}>
          <Text style={styles.subTitle}>(87)988755944</Text>
          <Text style={styles.subTitle}>brunoedif@gmail.com</Text>
        </HStack>
        <Divider width={"90%"} alignSelf={"center"} />
        <Text style={styles.share}>
          Compartilhe com amigos e ganhe pontos Grupou &nbsp;
          <FontAwesome name="share" size={15} color={Primary} />
        </Text>
      </Box>

      <Stack mt={8}>
        <Box
          alignItems={"center"}
          justifyContent={"center"}
          width={"50%"}
          height={41}
        >
          <Text style={styles.title}>Gerenciar perfil</Text>
        </Box>

        <TouchableOpacity
          style={styles.options}
          onPress={() => navigation.navigate("ProfileInfo")}
        >
          <Box flexDirection={"row"}>
            <AntDesign
              style={styles.content}
              name="user"
              size={20}
              color="black"
            />
            <Text style={styles.text}>Informações pessoais</Text>
          </Box>
          <AntDesign name="right" size={20} color="black" />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          onPress={() => navigation.navigate("Wallet")}
          style={styles.options}
        >
          <Box flexDirection={"row"}>
            <AntDesign
              style={styles.content}
              name="wallet"
              size={20}
              color="black"
            />
            <Text style={styles.text}>Carteira</Text>
          </Box>
          <AntDesign name="right" size={20} color="black" />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          onPress={() => navigation.navigate("AddProduct")}
          style={styles.options}
        >
          <Box flexDirection={"row"}>
            <MaterialIcons
              style={styles.content}
              name="group-add"
              size={20}
              color="black"
            />
            <Text style={styles.text}>Criar grupo</Text>
          </Box>
          <AntDesign name="right" size={20} color="black" />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity style={styles.options}>
          <Box flexDirection={"row"}>
            <MaterialIcons
              style={styles.content}
              name="groups"
              size={20}
              color="black"
            />
            <Text style={styles.text}>Meus Grupos</Text>
          </Box>
          <AntDesign name="right" size={20} color="black" />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity style={styles.options}>
          <Box flexDirection={"row"}>
            <MaterialIcons
              style={styles.content}
              name="help-outline"
              size={20}
              color="black"
            />
            <Text style={styles.text}>Ajuda</Text>
          </Box>
          <AntDesign name="right" size={20} color="black" />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity style={styles.options} onPress={Logout}>
          <Box flexDirection={"row"}>
            <MaterialIcons
              style={styles.content}
              name="logout"
              size={20}
              color={Error}
            />
            <Text style={styles.textLogout}>Sair</Text>
          </Box>
        </TouchableOpacity>
      </Stack>
    </SafeAreaView>
  );
}
