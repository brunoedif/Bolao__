import React, { useContext, useEffect, useState } from "react";
import { ImageBackground, View } from "react-native";
import { AuthContext } from "../../context/auth";
import {
  HStack,
  Center,
  Input,
  Icon,
  Avatar,
  Image,
  FlatList,
  Text,
  Box,
  useDisclose,
  Actionsheet,
  Divider,
  Button,
  Tooltip,
  ScrollView,
} from "native-base";
import styles from "./styles";
import { MaterialIcons, AntDesign, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Touchables } from "./components/Consts";
import { Last } from "./components/Consts";
import { useNavigation } from "@react-navigation/native";
import {
  BackgroundPrimary,
  BackgroundSecondary,
  Border,
  Primary,
  TextTertiary,
} from "../../components/Colors";
import { useIsFocused } from "@react-navigation/native";
export default function Search() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { ShowTab } = useContext(AuthContext);
  const [selected, setSelected] = useState(0);

  function PutSelected(key) {
    setSelected(key);
  }
  useEffect(() => {
    if (isFocused) {
      ShowTab("visible");
    }
  });

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
            <TouchableOpacity style={styles.iconHead}>
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
          <View style={styles.footerTitle}>
            <Text style={styles.filterTitle}>Mais Populares</Text>
            <TouchableOpacity>
              <Text style={styles.footerText}>Ver Todos</Text>
            </TouchableOpacity>
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
        style={styles.lastContainer}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        data={Last}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Checkout", {
                  id: item.key1,
                  title: item.name,
                  source: item.source,
                  places: item.places,
                  price: item.price,
                })
              }
              key={item.key1}
              style={styles.lastContent}
            >
              <Image
                key={item.key2}
                style={styles.lastImage}
                alt=""
                source={item.source}
              />
              <Text key={item.key3} style={styles.cardInfoName}>
                {item.name}
              </Text>
              <View key={item.key4} style={styles.infoContainer}>
                <Text key={item.key6} style={styles.cardInfo}>
                  Preço: R$ {item.price}
                </Text>
                <Text key={item.key6} style={styles.cardInfo}>
                  Vagas: {item.places}
                </Text>
              </View>
            </TouchableOpacity>
          </>
        )}
      />
    </SafeAreaView>
  );
}
