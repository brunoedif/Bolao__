import { Text } from "native-base";
import React, { useContext, useEffect, useMemo } from "react";
import { ImageBackground, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AuthContext } from "../../context/auth";
import { Center, Input, Icon, Avatar, Image, FlatList, Box } from "native-base";
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
import axios from "axios";
import { useState } from "react";
export default function Home({ navigation }) {
  const { showTab } = useContext(AuthContext);
  const [products, setProducts] = useState(null);
  const isFocused = useIsFocused();
  const productsMemo = useMemo(() => products, [products]);

  useEffect(() => {
    if (isFocused) {
      showTab("visible");
      const fetchData = async () => {
        const options = {
          method: "GET",
          url: "https://api.rutherles.com/api/jogos",
          headers: { "Content-Type": "application/json" },
        };

        try {
          const response = await axios.request(options);
          console.log(response.data);
          setProducts(response.data);
        } catch (error) {
          console.error("Requisição de produtos inválida");
        }
      };

      fetchData();
    }
  }, [isFocused]);

  if (products === null) {
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
        <View style={styles.Header}>
          <View style={styles.HeaderTop}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Search", { focused: true })}
              style={styles.HeaderLeft}
            >
              <Input
                isDisabled={true}
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
                    uri: "https://api.multiavatar.com/Binx%20Boadjss.png",
                  }}
                ></Avatar>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
          <Text style={styles.title}>Acabou de chegar</Text>
          <View style={styles.cardContainer}>
            <View style={styles.cardContainerLeft}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Checkout", {
                    imagem: products[0].imagem,
                    imagem_small: JSON.stringify(
                      products[0].imagem_small
                    ).replace(/"/g, ""),
                    nome: products[0].nome,
                    status: products[0].status,
                    jogo_id: products[0].id,
                    descricao: products[0].descricao,
                    cota_total: JSON.stringify(products[0].cota_total).replace(
                      /"/g,
                      ""
                    ),
                    valor: products[0].valor,
                    premiacao: products[0].premiacao,
                    arquivos: products[0].uploads ? products[0].uploads : null,
                    dezenas: products[0].dezenas,
                    premiacao: products[0].premiacao,
                    concurso: products[0].concurso,
                    data: products[0].data,
                    cotas: products[0].cotas,
                    semana: products[0].semana,
                  })
                }
                style={styles.cardContentLeft}
              >
                <Image
                  style={styles.cardImageLeft}
                  source={{
                    uri:
                      "https://api.rutherles.com/bolao/pages/uploads/" +
                      products[0].imagem,
                  }}
                  alt=""
                />
              </TouchableOpacity>
            </View>

            <View style={styles.cardContainerRight}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Checkout", {
                    imagem: products[1].imagem,
                    imagem_small: JSON.stringify(
                      products[1].imagem_small
                    ).replace(/"/g, ""),
                    nome: products[1].nome,
                    status: products[1].status,
                    jogo_id: products[1].id,
                    descricao: products[1].descricao,
                    cota_total: JSON.stringify(products[1].cota_total).replace(
                      /"/g,
                      ""
                    ),
                    valor: products[1].valor,
                    premiacao: products[1].premiacao,
                    arquivos: products[1].uploads ? products[1].uploads : null,
                    dezenas: products[1].dezenas,
                    premiacao: products[1].premiacao,
                    concurso: products[1].concurso,
                    data: products[1].data,
                    cotas: products[1].cotas,
                    semana: products[1].semana,
                  })
                }
                style={styles.cardContentRightTop}
              >
                <Image
                  style={styles.cardImageRight}
                  alt=""
                  source={{
                    uri:
                      "https://api.rutherles.com/bolao/pages/uploads/" +
                      products[1].imagem,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Checkout", {
                    imagem: products[2].imagem,
                    imagem_small: JSON.stringify(
                      products[2].imagem_small
                    ).replace(/"/g, ""),
                    nome: products[2].nome,
                    status: products[2].status,
                    jogo_id: products[2].id,
                    descricao: products[2].descricao,
                    cota_total: JSON.stringify(products[2].cota_total).replace(
                      /"/g,
                      ""
                    ),
                    valor: products[2].valor,
                    premiacao: products[2].premiacao,
                    arquivos: products[2].uploads ? products[2].uploads : null,
                    dezenas: products[2].dezenas,
                    premiacao: products[2].premiacao,
                    concurso: products[2].concurso,
                    data: products[2].data,
                    cotas: products[2].cotas,
                    semana: products[2].semana,
                  })
                }
                style={styles.cardContentRightBottom}
              >
                <Image
                  style={styles.cardImageRight}
                  alt=""
                  source={{
                    uri:
                      "https://api.rutherles.com/bolao/pages/uploads/" +
                      products[2].imagem,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.title}>Queridinhos da galera</Text>
          <FlatList
            style={styles.categoriesView}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={productsMemo}
            renderItem={({ item }) => (
              <Center key={item.id} width={100}>
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
                  <Image
                    alt=""
                    style={styles.categories}
                    source={{
                      uri:
                        "https://api.rutherles.com/bolao/pages/uploads/" +
                        item.imagem,
                    }}
                  />
                </TouchableOpacity>

                <Text style={styles.subTitle}>{item.nome}</Text>
              </Center>
            )}
          />

          <View style={styles.flatLabel}>
            <Text style={styles.title}>Maiores chances</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
              <Text style={styles.titleAll}>Ver Todos</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            style={styles.lastContainer}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={productsMemo}
            renderItem={({ item }) => (
              <New
                dezenas={item.dezenas}
                premio={item.premiacao}
                cover={
                  "https://api.rutherles.com/bolao/pages/uploads/" + item.imagem
                }
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
                  })
                }
              />
            )}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
