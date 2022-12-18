import {
  Box,
  Text,
  Center,
  Avatar,
  HStack,
  Stack,
  Divider,
  FlatList,
  Image,
} from "native-base";
import React, { useContext, useEffect } from "react";
import { View, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
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
import { Group } from "./components/Consts";
import { useIsFocused } from "@react-navigation/native";
import stylesnew from "./components/New";
export default function Profile({ navigation }) {
  const { ShowTab, user, bilhete } = useContext(AuthContext);
  const jogos = bilhete;
  useEffect(() => {
    if (isFocused) {
      ShowTab("visible");
    }
  });
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
          <Text style={styles.name}>&nbsp; {user[0].nome}&nbsp;</Text>
        </Box>

        <HStack style={styles.header}>
          <Text style={styles.subTitle}>{user[0].telefone}</Text>
          <Text style={styles.subTitle}>{user[0].email}</Text>
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

        <FlatList
          numColumns={2}
          w={"100%"}
          px={"5px"}
          style={styles.lastContainer}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          data={jogos}
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
                  cota_total: JSON.stringify(item.cota_total).replace(/"/g, ""),
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
                  uri: item.imagem,
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
      </Stack>
    </SafeAreaView>
  );
}
