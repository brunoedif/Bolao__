import { Box, Circle, Divider, StatusBar, Text } from "native-base";
import React, { useContext, useEffect } from "react";
import { ImageBackground, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AuthContext } from "../../context/auth";
import {
  HStack,
  Center,
  Input,
  Icon,
  Avatar,
  Image,
  FlatList,
} from "native-base";
import styles from "./styles";
import { MaterialIcons, AntDesign, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { Touchables } from "./components/Consts";
import { Categories } from "./components/Consts";
import { Last } from "./components/Consts";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  BackgroundPrimary,
  BackgroundSecondary,
  Border,
  Error,
  Primary,
  TextTertiary,
} from "../../components/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { JogosApi } from "../../components/hooks/JogoApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import New from "./components/New";
export default function Home({ navigation }) {
  const { ShowTab } = useContext(AuthContext);
  const [selected, setSelected] = useState("1");
  const { jogos, loading } = JogosApi("https://rutherles.site/api/jogos");
  const [filter, setFilter] = React.useState();
  const [filtros, setFiltros] = React.useState();
  const [loop, setLoop] = React.useState(true);
  const gif = require("../../components/hooks/load.gif");
  let every = loading == false ? jogos : [];

  useEffect(() => {
    if (isFocused) {
      ShowTab("visible");
    }
  });
  const isFocused = useIsFocused();
  function PutSelected(data) {
    setSelected(data);
  }
  const day = every.filter((item) => item);

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
                  uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                }}
              ></Avatar>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footerHeader}>
          <View style={styles.flatLabel}>
            <Text style={styles.title}>Mais Populares</Text>
            <TouchableOpacity>
              <Text style={styles.titleAll}>Ver Todos</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            style={styles.filter}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={Touchables}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => PutSelected(item.id)}
                style={StyleSheet.flatten([
                  styles.filterOptions,
                  {
                    backgroundColor:
                      selected == item.id ? Primary : BackgroundSecondary,
                    borderColor: selected == item.id ? Primary : Border,
                  },
                ])}
              >
                <Text
                  style={StyleSheet.flatten([
                    styles.subTitle,
                    {
                      color:
                        selected == item.id
                          ? BackgroundSecondary
                          : TextTertiary,
                    },
                  ])}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            )}
          />
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
          data={jogos}
          renderItem={({ item }) => (
            <Center
              display={
                item.nome == "iniciado" || item.nome == "finalizado"
                  ? "none"
                  : "flex"
              }
              key={item.id}
              width={110}
            >
              <TouchableOpacity
                price={item.price}
                onPress={() =>
                  navigation.navigate("Checkout", {
                    id: item.id,
                    title: item.name,
                    source: item.imagem,

                    price: item.price,
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
          data={jogos}
          renderItem={({ item }) => (
            <Box
              display={
                item.imagem == null
                  ? "none"
                  : item.imagem_small == null
                  ? "none"
                  : "flex"
              }
              key={item.id}
            >
              <New
                dezenas={item.dezenas}
                premio={item.premiacao}
                cover={item.imagem}
                name={item.nome}
                status={item.status}
                valor={item.valor}
                description={item.descricao}
                onPress={() =>
                  navigation.navigate("Detalhes", {
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
            </Box>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
