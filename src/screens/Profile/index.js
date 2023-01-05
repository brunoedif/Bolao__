import {
  Box,
  Text,
  Avatar,
  HStack,
  Stack,
  Divider,
  FlatList,
  Image,
  Center,
} from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { View, SafeAreaView, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { BackgroundSecondary, Primary } from "../../components/Colors";
import { useIsFocused } from "@react-navigation/native";
import stylesnew from "./components/New";
import { AuthContext } from "../../context/auth";

import axios from "axios";
export default function Profile({ navigation }) {
  const { showTab, id } = useContext(AuthContext);
  const isFocused = useIsFocused();
  const [brougth, setBrought] = useState(null);
  const [user, setUser] = useState({});
  useEffect(() => {
    if (isFocused) {
      showTab("visible");
      const options = {
        method: "GET",
        url: "https://api.rutherles.com/api/compras/",
        params: { user_id: "228" },
        headers: { "Content-Type": "application/json" },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          setBrought(response.data.reverse());
        })
        .catch(function (error) {
          console.error(error);
        });
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
  console.error(brougth);
  if (brougth === null) {
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

        <Stack>
          <Text pt={2} px={4} style={styles.title}>
            Meus grupos
          </Text>
          {brougth !== null && brougth.length > 0 ? (
            <FlatList
              numColumns={2}
              px={"5px"}
              style={styles.lastContainer}
              showsVerticalScrollIndicator={false}
              scrollEnabled={true}
              data={brougth}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Checkout", {
                      imagem: item.imagem,
                      imagem_small: JSON.stringify(item.imagem_small).replace(
                        /"/g,
                        ""
                      ),
                      nome: item.nome,
                      status: item.status,
                      jogo_id: item.id,
                      descricao: item.descricao,

                      valor: item.valor,
                      premiacao: item.premiacao,
                      arquivos: item.uploads ? item.uploads : null,
                      dezenas: item.dezenas,
                      premiacao: item.premiacao,
                      concurso: item.concurso,
                      data: item.data,
                      cotas: item.cotas,
                      semana: item.semana,
                    })
                  }
                  style={stylesnew.container}
                >
                  <Image
                    alt=""
                    source={{
                      uri:
                        "https://api.rutherles.com/bolao/pages/uploads/" +
                        item.imagem,
                    }}
                    style={stylesnew.cover}
                  />

                  <View style={stylesnew.content}>
                    <Text style={stylesnew.title}>{item.nome}</Text>

                    <View style={stylesnew.dot}></View>

                    <Text style={stylesnew.badge}>{item.status}</Text>
                  </View>

                  <Text style={stylesnew.description}>{item.descricao}</Text>

                  <View style={stylesnew.footer}>
                    <View style={{ width: "80%" }}>
                      <Text style={stylesnew.price}>R$ {item.valor}</Text>
                    </View>

                    <View style={{ width: "20%" }}>
                      <Ionicons name="ios-add-circle" size={24} color="black" />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Center justifyContent={"center"} mt={"50%"}>
              <Text style={styles.title}>
                Você ainda não comprou nenhum jogo!
              </Text>
            </Center>
          )}
        </Stack>
      </SafeAreaView>
    );
  }
}
