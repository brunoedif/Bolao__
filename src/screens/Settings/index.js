import { Box, Text, Avatar, HStack, Stack, Divider } from "native-base";
import React, { useContext, useEffect } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import styles from "./styles";
import { MaterialIcons, AntDesign, FontAwesome } from "@expo/vector-icons";
import { BackgroundSecondary, Error, Primary } from "../../components/Colors";
import { AuthContext } from "../../context/auth";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";

export default function Settings({ navigation }) {
  const { showTab, logout, id } = useContext(AuthContext);
  const [user, setUser] = React.useState({});

  useEffect(() => {
    if (isFocused) {
      showTab("visible");
      const options = {
        method: "POST",
        url: "https://rutherles.site/api/compras",
        headers: { "Content-Type": "application/json" },
        data: { user_id: id },
      };
      // get user data from API
      axios
        .get("https://api.rutherles.com/api/usuario/" + id)
        .then((response) => {
          setUser(response.data[0]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [isFocused]);

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
            uri: "https://api.multiavatar.com/Binx%20Boadjss.png",
          }}
        />
        <Box style={styles.avatar}>
          <Text style={styles.name}>&nbsp; {user.nome}&nbsp;</Text>
        </Box>

        <HStack style={styles.header}>
          <Text style={styles.subTitle}>{user.telefone}</Text>
          <Text style={styles.subTitle}>{user.email}</Text>
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
        <TouchableOpacity style={styles.options} onPress={() => logout()}>
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
