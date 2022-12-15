import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";

import { View, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box, Image, Text, Avatar, Divider, HStack } from "native-base";
import { MaterialIcons, AntDesign, Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { Last } from "./components/Consts";
import {
  BackgroundPrimary,
  BackgroundSecondary,
  Primary,
  TextTertiary,
} from "../../components/Colors";
import { JogosApi } from "../../components/hooks/JogoApi";
export default function Checkout({ route, navigation }) {
  const { jogos, loading } = JogosApi("https://rutherles.site/api/jogos");
  const { id, title, price, source, places } = route.params;
  const [count, setCount] = useState(1);
  const [countMonths, setCountMonths] = useState(1);
  const data = Last.map((item) => item);
  console.log(id);
  function handleClickAddPlace() {
    if (count < places) {
      setCount(count + 1);
    }
  }
  function handleClickSubtractPlace() {
    if (count > 1) {
      setCount(count - 1);
    }
  }
  function handleClickAddMonth() {
    if (countMonths < 5) {
      setCountMonths(countMonths + 1);
    }
  }
  function handleClickSubtractMonth() {
    if (countMonths > 1) {
      setCountMonths(countMonths - 1);
    }
  }

  const { ShowTab } = useContext(AuthContext);

  useEffect(() => {
    ShowTab("none");
  });

  return (
    <SafeAreaView backgroundColor={BackgroundPrimary}>
      <ScrollView
        style={styles.ScrollBox}
        showsVerticalScrollIndicator={false}
        w="100%"
      >
        <Box
          px={4}
          py={4}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Box
            backgroundColor={BackgroundSecondary}
            borderRadius={20}
            alignItems={"center"}
            style={styles.cardHost}
            width={"45 %"}
            height={150}
            justifyContent={"center"}
          >
            <TouchableOpacity key={data.key1} style={styles.productCard}>
              <Image
                key={data.key2}
                style={styles.lastImage}
                alt=""
                source={source}
              />
              <Text key={data.key3} style={styles.cardProductInfoName}>
                {title}
              </Text>
            </TouchableOpacity>
          </Box>
          <Box
            backgroundColor={BackgroundSecondary}
            borderRadius={20}
            alignItems={"center"}
            style={styles.cardHost}
            width={"45 %"}
            height={150}
            justifyContent={"center"}
          >
            <Avatar
              style={styles.avatar}
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              }}
            ></Avatar>
            <Box flexDirection={"row"} alignItems={"center"}>
              <Text px={2} style={styles.cardInfoName}>
                4.5
              </Text>
              <AntDesign name="star" size={14} color={Primary} />
            </Box>
            <Text style={styles.cardInfo}>Manuele Vitória</Text>
          </Box>
        </Box>

        <Box
          pt={4}
          px={4}
          flexDirection={"row"}
          justifyContent={"space-between"}
          style={styles.productTitle}
        >
          <Text key={data.key6} style={styles.cardInfo}>
            Mensalidade:
          </Text>
          <Text key={data.key6} style={styles.cardInfo}>
            R$ {price}
          </Text>
        </Box>
        <Divider color={TextTertiary} marginVertical={15} />
        <Box
          px={4}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          style={styles.productTitle}
        >
          <Text key={data.key6} style={styles.cardInfo}>
            Vagas:
          </Text>

          <HStack
            style={styles.placesButtons}
            width={"21%"}
            justifyContent={"space-between"}
          >
            <TouchableOpacity
              onPress={handleClickSubtractPlace}
              color={TextTertiary}
              style={styles.buttom}
            >
              <Ionicons
                name="md-remove-circle-outline"
                size={25}
                color={TextTertiary}
              />
            </TouchableOpacity>
            <Text color={TextTertiary} fontSize={15}>
              {count}
            </Text>
            <TouchableOpacity
              onPress={handleClickAddPlace}
              color={TextTertiary}
              style={styles.buttom}
            >
              <Ionicons
                name="ios-add-circle-outline"
                size={25}
                color={TextTertiary}
              />
            </TouchableOpacity>
          </HStack>
        </Box>
        <Divider marginVertical={15} />
        <Box
          px={4}
          flexDirection={"row"}
          justifyContent={"space-between"}
          style={styles.productTitle}
        >
          <Text key={data.key6} style={styles.cardInfo}>
            Duração:
          </Text>
          <HStack
            style={styles.placesButtons}
            width={"21%"}
            justifyContent={"space-between"}
          >
            <TouchableOpacity
              onPress={handleClickSubtractMonth}
              color={TextTertiary}
              style={styles.buttom}
            >
              <Ionicons
                name="md-remove-circle-outline"
                size={25}
                color={TextTertiary}
              />
            </TouchableOpacity>
            <Text color={TextTertiary} fontSize={15}>
              {countMonths}
            </Text>
            <TouchableOpacity
              onPress={handleClickAddMonth}
              color={TextTertiary}
              style={styles.buttom}
            >
              <Ionicons
                name="ios-add-circle-outline"
                size={25}
                color={TextTertiary}
              />
            </TouchableOpacity>
          </HStack>
        </Box>
        <Divider marginVertical={15} />
        <Box
          px={4}
          flexDirection={"row"}
          justifyContent={"space-between"}
          style={styles.productTitle}
        >
          <Text key={data.key6} style={styles.cardInfo}>
            Acesso:
          </Text>
          <Text key={data.key6} style={styles.cardInfo}>
            Senha por Email
          </Text>
        </Box>
        <Divider marginVertical={15} />

        <Box px={4} py={2} my={4} backgroundColor={BackgroundSecondary}>
          <Text pb={2} style={styles.cardInfoResumeTitle}>
            Descrição:
          </Text>
          <Text style={styles.cardInfo}>
            O administrador não forneceu nenhuma descrição para este grupo.
          </Text>
        </Box>
        <Box px={4} py={2} my={4} backgroundColor={BackgroundSecondary}>
          <Text pb={2} style={styles.cardInfoResume}>
            Regras:
          </Text>
          <Text style={styles.cardInfo}>
            Não compartilhe a senha com ninguém fora deste grupo de assinatura.{" "}
            {"\n"}
            Não utilize esta conta compartilhada para postar em meu nome do
            administrador. {"\n"}
            Não altere a senha do grupo. {"\n"}
          </Text>
        </Box>
      </ScrollView>

      <Box
        width={"95%"}
        alignSelf={"center"}
        borderRadius={20}
        marginTop={4}
        backgroundColor={BackgroundSecondary}
        style={styles.cardCheck}
      >
        <Box
          py={4}
          px={4}
          flexDirection={"row"}
          justifyContent={"space-between"}
          style={styles.productTitle}
        >
          <Text key={data.key6} style={styles.cardInfoResumeTitle}>
            Total da inscrição:
          </Text>
          <Text key={data.key6} style={styles.cardInfoResume}>
            R$ {data[0].price * count * countMonths}
          </Text>
        </Box>
        <TouchableOpacity style={styles.infoButton}>
          <Text style={styles.infoText}>Participar</Text>
        </TouchableOpacity>
      </Box>
    </SafeAreaView>
  );
}
