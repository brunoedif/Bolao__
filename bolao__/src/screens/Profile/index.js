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
import { Group } from "./components/Consts";
import { useIsFocused } from "@react-navigation/native";
export default function Profile({ navigation }) {
  const { ShowTab, informacoes } = useContext(AuthContext);

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

      <Stack>
        <Text pt={2} px={4} style={styles.title}>
          Meus grupos
        </Text>

        <FlatList
          style={styles.productContainer}
          horizontal={false}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          data={Group}
          renderItem={({ item }) => (
            <TouchableOpacity key={item.key1} style={styles.productCard}>
              <Image
                key={item.key2}
                style={styles.imageCard}
                alt=""
                source={item.source}
              />
              <Text key={item.key3} style={styles.titleCard}>
                {item.name}
              </Text>
              <View key={item.key4} style={styles.infoContainer}>
                <Text key={item.key6} style={styles.subTitleCard}>
                  Preço: R$ {item.priceDescription}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </Stack>
    </SafeAreaView>
  );
}
