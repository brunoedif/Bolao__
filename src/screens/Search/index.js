import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { AuthContext } from "../../context/auth";
import { Input, Icon, Avatar, Image, FlatList, Text, Box } from "native-base";
import styles from "./styles";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Touchables } from "./components/Consts";
import { StackRouter, useNavigation } from "@react-navigation/native";
import {
  BackgroundPrimary,
  BackgroundSecondary,
  Border,
  Primary,
  TextTertiary,
} from "../../components/Colors";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import stylesnew from "./components/New";
export default function Search() {
  const [products, setProducts] = useState(null);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { showTab } = useContext(AuthContext);
  const [selected, setSelected] = useState("TODOS");
  const [searchBar, setSearchBar] = useState("");
  function PutSelected(key) {
    setSelected(key);
  }
  useEffect(() => {
    if (isFocused) {
      showTab("visible");
      const options = {
        method: "GET",
        url: "https://api.rutherles.com/api/jogos",
        headers: { "Content-Type": "application/json" },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          setProducts(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
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
            <TouchableOpacity style={styles.HeaderTouchable}>
              <Input
                borderRadius={10}
                backgroundColor={BackgroundPrimary}
                width={"100%"}
                height={30}
                value={searchBar}
                onChangeText={(text) => setSearchBar(text)}
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="search" />}
                    size={5}
                    ml="2"
                    color="muted.400"
                  />
                }
                placeholder={"Pesquisar"}
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
              <TouchableOpacity style={styles.iconHead}>
                <Avatar
                  style={styles.avatar}
                  source={{
                    uri: "https://api.multiavatar.com/Binx%20Boadjss.png",
                  }}
                ></Avatar>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footerHeader}>
            <View style={styles.footerTitle}>
              <Text style={styles.filterTitle}>Mais Populares</Text>
            </View>
            <FlatList
              style={styles.filter}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={Touchables}
              renderItem={({ item }) => (
                <TouchableOpacity
                  key={item.key}
                  onPress={() => PutSelected(item.key)}
                  style={StyleSheet.flatten([
                    styles.filterOptions,
                    {
                      backgroundColor:
                        selected == item.key ? Primary : BackgroundSecondary,
                      borderColor: selected == item.key ? Primary : Border,
                    },
                  ])}
                >
                  <Text
                    key={item.key2}
                    style={StyleSheet.flatten([
                      styles.filterOptionsText,
                      {
                        color:
                          selected == item.key
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

        <FlatList
          numColumns={2}
          w={"100%"}
          px={"5px"}
          style={styles.lastContainer}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          data={products}
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
              style={StyleSheet.flatten([
                stylesnew.container,
                {
                  display:
                    item.nome == selected || selected == "TODOS"
                      ? "flex"
                      : "none",
                },
              ])}
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
      </SafeAreaView>
    );
  }
}
