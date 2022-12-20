import { Text } from "native-base";
import React, { useContext, useEffect } from "react";
import { ImageBackground, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AuthContext } from "../../context/auth";
import { Center, Input, Icon, Avatar, Image, FlatList } from "native-base";
import styles from "./styles";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  BackgroundPrimary,
  BackgroundSecondary,
} from "../../components/Colors";
import { useIsFocused } from "@react-navigation/native";
import New from "./components/New";
import { onProducts } from "../../../services/products";
import onUser from "../../../services/onUser";
import { getLocalUser } from "../../../services/asyncStorage";
export default function Home({ navigation }) {
  const { ShowTab } = useContext(AuthContext);
  const { products } = onProducts();
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      () => getLocalUser();

      ShowTab("visible");
    }
  });
  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.Header}>
        <View style={styles.HeaderTop}>
          <TouchableOpacity style={styles.HeaderLeft}>
            <Input
              borderRadius={10}
              backgroundColor={BackgroundPrimary}
              width={"100%"}
              height={30}
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="search" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
              placeholder="Pesquisar"
            />
          </TouchableOpacity>

          <View style={styles.rigthHeader}>
            <TouchableOpacity>
              <Icon
                as={<Ionicons style={styles.icon} name="notifications" />}
                ml="2"
                color={BackgroundSecondary}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Avatar
                style={styles.avatar}
                source={{
                  uri: "https://yt3.ggpht.com/eULZKQKOu5C6OTPyEdw_vTEsJ2zgnoZSMSwVRuDvk2Hm8qmsovMA7KLcHwwBDcDlME-UfyKb=s88-c-k-c0x00ffffff-no-rj",
                }}
              ></Avatar>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        <Text style={styles.title}>Sorteios diários</Text>
        <View style={styles.cardContainer}>
          <View style={styles.cardContainerLeft}>
            <TouchableOpacity style={styles.cardContentLeft}>
              <Image
                style={styles.cardImageLeft}
                source={require("../../../assets/img/daylyq.png")}
                alt=""
              />
            </TouchableOpacity>
          </View>

          <View style={styles.cardContainerRight}>
            <TouchableOpacity style={styles.cardContentRightTop}>
              <Image
                style={styles.cardImageRight}
                alt=""
                source={require("../../../assets/img/daylyl.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardContentRightBottom}>
              <Image
                style={styles.cardImageRight}
                alt=""
                source={require("../../../assets/img/daylylm.png")}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.title}>Queridinhos da galera</Text>
        <FlatList
          style={styles.categoriesView}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={products}
          renderItem={({ item }) => (
            <Center
              display={
                item.nome == "iniciado" || item.nome == "finalizado"
                  ? "none"
                  : "flex"
              }
              key={item.id}
              width={100}
            >
              <TouchableOpacity
                price={item.price}
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
                    cota_total: JSON.stringify(item.cota_total).replace(
                      /"/g,
                      ""
                    ),
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
                style={styles.categorieTouch}
              >
                <ImageBackground
                  alt=""
                  style={styles.categories}
                  source={
                    item.nome == "MEGA-SENA"
                      ? require("../../../assets/img/megasena.png")
                      : item.nome == "LOTOFÁCIL" ||
                        item.nome == "LOTOF\u00c1CIL"
                      ? require("../../../assets/img/lotofacil.png")
                      : item.nome == "QUINA"
                      ? require("../../../assets/img/quina.png")
                      : item.nome == "LOTECA"
                      ? require("../../../assets/img/loteca.jpg")
                      : item.nome == "DUPLA SENA"
                      ? require("../../../assets/img/duplasena.png")
                      : item.imagem
                  }
                />
              </TouchableOpacity>

              <Text style={styles.subTitle}>{item.nome}</Text>
            </Center>
          )}
        />

        <View style={styles.flatLabel}>
          <Text style={styles.title}>Maiores chances</Text>
          <TouchableOpacity>
            <Text style={styles.titleAll}>Ver Todos</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          style={styles.lastContainer}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={products}
          renderItem={({ item }) => (
            <New
              dezenas={item.dezenas}
              premio={item.premiacao}
              cover={item.imagem}
              name={item.nome}
              status={item.status}
              valor={item.valor}
              description={item.descricao}
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
                })
              }
            />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
