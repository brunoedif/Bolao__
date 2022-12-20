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
import { token } from "../../components/hooks/asyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import onUser from "../../../services/onUser";

export default function Settings({ navigation }) {
  const { ShowTab, PutsignedIn, signedIn, postUser } = useContext(AuthContext);
  const user = onUser();

  useEffect(() => {
    if (isFocused) {
      ShowTab("visible");
    }
  });

  function sair() {
    removeValue = async () => {
      try {
        await AsyncStorage.removeItem("@user");
      } catch (e) {
        ("        remove error");
      }

      console.log("Done.");
    };
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
            uri: "https://yt3.ggpht.com/eULZKQKOu5C6OTPyEdw_vTEsJ2zgnoZSMSwVRuDvk2Hm8qmsovMA7KLcHwwBDcDlME-UfyKb=s88-c-k-c0x00ffffff-no-rj",
          }}
        />
        <Box style={styles.avatar}>
          <Text style={styles.name}>&nbsp;{user.user.nome} &nbsp;</Text>
        </Box>

        <HStack style={styles.header}>
          <Text style={styles.subTitle}>{user.user.telefone}</Text>
          <Text style={styles.subTitle}>{user.user.email}</Text>
        </HStack>
        <Divider width={"90%"} alignSelf={"center"} />
        <Text style={styles.share}>
          Compartilhe com amigos e ganhe pontos &nbsp;
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
          onPress={() => navigation.navigate("Profile")}
          style={styles.options}
        >
          <Box flexDirection={"row"}>
            <MaterialIcons
              style={styles.content}
              name="groups"
              size={20}
              color="black"
            />
            <Text style={styles.text}>Meus Bilhetes</Text>
          </Box>
          <AntDesign name="right" size={20} color="black" />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          style={styles.options}
          onPress={() => navigation.navigate("Result")}
        >
          <Box flexDirection={"row"}>
            <MaterialIcons
              style={styles.content}
              name="help-outline"
              size={20}
              color="black"
            />
            <Text style={styles.text}>Resultados</Text>
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
        <TouchableOpacity style={styles.options} onPress={sair}>
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
