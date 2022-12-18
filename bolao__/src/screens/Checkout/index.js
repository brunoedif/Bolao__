import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import {
  Alert,
  Button,
  Center,
  CloseIcon,
  IconButton,
  Modal,
  useDisclose,
  VStack,
} from "native-base";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box, Image, Text, Avatar, Divider, HStack } from "native-base";
import { MaterialIcons, AntDesign, Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { Last } from "./components/Consts";
import {
  BackgroundPrimary,
  BackgroundSecondary,
  Error,
  Primary,
  TextTertiary,
} from "../../components/Colors";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { UserApi } from "../../components/hooks/users";
import { useFocusEffect } from "@react-navigation/native";
export default function Checkout({ route, navigation }) {
  const {
    imagem,
    imagem_small,
    nome,
    status,
    jogo_id,
    descricao,
    cota_total,
    valor,
    premiacao,
    arquivos,
    dezenas,
    semana,
    concurso,
    data,
    cotas,
  } = route.params;
  const [count, setCount] = useState(1);
  const [countMonths, setCountMonths] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclose();
  const { ShowTab, GetUser, user } = useContext(AuthContext);
  const total = valor * count * countMonths;
  const [cotes, setCotes] = useState([]);
  const first = "nome".split(" ")[0];
  const [wallet, setWallet] = useState(0);
  const isFocused = useIsFocused();
  const cotestotal = cotes - count;
  function handleClickAddQuotes() {
    if (count < cotes) {
      setCount(count + 1);
    }
  }
  function handleClickSubtractQuotes() {
    if (count > 1) {
      setCount(count - 1);
    }
  }
  function handleClickAddMonth() {
    if (countMonths < semana) {
      setCountMonths(countMonths + 1);
    }
  }
  function handleClickSubtractMonth() {
    if (countMonths > 1) {
      setCountMonths(countMonths - 1);
    }
  }

  useEffect(() => {
    ShowTab("none");

    const options = {
      method: "GET",
      url: "https://rutherles.site/api/usuario/" + user[0].id,
      headers: { "Content-Type": "application/json" },
    };

    axios
      .request(options)
      .then(function (response) {
        setWallet(response.data[0].carteira);
      })
      .catch(function (error) {
        console.error(error);
      });

    const GetCotas = {
      method: "GET",
      url: "https://rutherles.site/api/jogos/",
      headers: { "Content-Type": "application/json" },
    };

    axios
      .request(GetCotas)
      .then(function (response) {
        setCotes(response.data[0].cota_total);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [isFocused]);

  function RechargeWallet() {
    onClose();

    navigation.navigate("Wallet");
  }

  function comprar() {
    const options = {
      method: "POST",
      url: "https://rutherles.site/api/compra",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        user_id: user[0].id,
        valor: parseInt(valor),
        imagem_small: imagem,
        nome: nome,
        dezenas: dezenas,
        data: data,
        concurso: concurso,
        premiacao: premiacao,
      },
    };
    axios
      .request(options)
      .then(function (response) {})
      .catch(function (error) {
        console.error("compra");
      });

    const storeData = async (value) => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem("@user", jsonValue);
      } catch (e) {
        ("   saving error");
      }
    };

    const options4 = {
      method: "POST",
      url: "https://rutherles.site/api/compras",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: { user_id: user[0].id },
    };

    axios
      .request(options4)
      .then(function (response) {
        storeData(response.data);
      })
      .catch(function (error) {
        console.error("minhas comprar");
      });

    const options6 = {
      method: "PUT",
      url: "https://rutherles.site/api/jogo/" + jogo_id,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: { cota_total: cotestotal },
    };

    axios
      .request(options6)
      .then(function (response) {})
      .catch(function (error) {});

    const options5 = {
      method: "POST",
      url: "https://rutherles.site/api/compras",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: { user_id: user[0].id },
    };
    axios
      .request(options5)
      .then(function (response) {
        console.log(response.data);

        onClose();
        navigation.navigate("Profile");
        alert("Compra realizada com sucesso!");
      })
      .catch(function (error) {
        console.error(error);
      });

    const putWallet = {
      method: "PUT",
      url: "https://rutherles.site/api/usuario/" + user[0].id,

      headers: { "Content-Type": "application/json" },
      data: { carteira: wallet - total },
    };

    axios
      .request(putWallet)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error("wallet");
      });
  }

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
            width={150}
            height={150}
            justifyContent={"center"}
          >
            <TouchableOpacity style={styles.productCard}>
              <Image
                style={styles.lastImage}
                source={
                  nome == "QUINA"
                    ? require("../../../assets/img/daylyq.png")
                    : nome == "MEGA-SENA"
                    ? require("../../../assets/img/daylyms.png")
                    : nome == "LOTOF\u00c1CIL"
                    ? require("../../../assets/img/daylylf.png")
                    : nome == "LOTECA"
                    ? require("../../../assets/img/daylylt.png")
                    : nome == "DUPLA SENA"
                    ? require("../../../assets/img/daylyds.png")
                    : { uri: imagem_small }
                }
                alt=""
              />
            </TouchableOpacity>
          </Box>
          <Box
            backgroundColor={BackgroundSecondary}
            borderRadius={20}
            alignItems={"center"}
            style={styles.cardHost}
            width={150}
            height={150}
            justifyContent={"center"}
          >
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
              <Text style={styles.cardInfoName}> {first} </Text>
            </Box>
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
            Valor (cota):
          </Text>
          <Text key={data.key6} style={styles.cardInfo}>
            R$ {valor}
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
            Cotas:
          </Text>

          <HStack
            style={styles.placesButtons}
            width={"21%"}
            justifyContent={"space-between"}
          >
            <TouchableOpacity
              onPress={handleClickSubtractQuotes}
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
              onPress={handleClickAddQuotes}
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
            Duração (sorteios):
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
            Dezenas:
          </Text>
          <Text key={data.key6} style={styles.cardInfo}>
            {dezenas}
          </Text>
        </Box>
        <Divider marginVertical={15} />
        <Box
          px={4}
          flexDirection={"row"}
          justifyContent={"space-between"}
          style={styles.productTitle}
        >
          <Text key={data.key6} style={styles.cardInfo}>
            Premiação:
          </Text>
          <Text key={data.key6} style={styles.cardInfo}>
            {premiacao}
          </Text>
        </Box>
        <Divider marginVertical={15} />
        <Box
          px={4}
          flexDirection={"row"}
          justifyContent={"space-between"}
          style={styles.productTitle}
        >
          <Text key={data.key6} style={styles.cardInfo}>
            Data limite:
          </Text>
          <Text key={data.key6} style={styles.cardInfo}>
            {data}
          </Text>
        </Box>
        <Divider marginVertical={15} />

        <Box px={4} py={2} my={4} backgroundColor={BackgroundSecondary}>
          <Text pb={2} style={styles.cardInfoResumeTitle}>
            Descrição:
          </Text>
          <Text style={styles.cardInfo}>{descricao}</Text>
        </Box>
        <Box px={4} py={2} my={4} backgroundColor={BackgroundSecondary}>
          <Text pb={2} style={styles.cardInfoResume}>
            Arquivos:
          </Text>
          <Text style={styles.cardInfo}>{arquivos}</Text>
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
            Total do bilhete:
          </Text>
          <Text key={data.key6} style={styles.cardInfoResume}>
            R$ {total}
          </Text>
        </Box>
        <TouchableOpacity onPress={onOpen} style={styles.infoButton}>
          <Text style={styles.infoText}>Participar</Text>
        </TouchableOpacity>
      </Box>
      {wallet < total ? (
        <Center>
          <Modal isOpen={isOpen} onClose={onClose}>
            <Modal.Content>
              <Modal.CloseButton />
              <Modal.Header fontSize="4xl" fontWeight="bold">
                Ops! algo deu errado!
              </Modal.Header>

              <Modal.Body>
                O saldo da sua conta é insuficiente para participar desse bolão.
                Deseja recarregar sua conta?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="unstyled" mr="1" onPress={onClose}>
                  Cancelar
                </Button>
                <Button colorScheme="error" onPress={RechargeWallet}>
                  Recarregar
                </Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </Center>
      ) : (
        <Center>
          <Modal isOpen={isOpen} onClose={onClose}>
            <Modal.Content width={"70%"}>
              <Modal.CloseButton />
              <Modal.Header fontSize="4xl" fontWeight="bold">
                Finalizar compra?
              </Modal.Header>

              <Modal.Body fontSize="4x2">
                <Text>
                  O saldo da sua conta é de R$ {wallet}. Deseja finalizar a
                  compra?
                </Text>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="unstyled" mr="1" onPress={onClose}>
                  Cancel
                </Button>
                <Button backgroundColor={Primary} onPress={comprar}>
                  Confirmar
                </Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </Center>
      )}
    </SafeAreaView>
  );
}
