import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import { Button, Center, Modal, Toast, useDisclose } from "native-base";
import { TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box, Image, Text, Avatar, Divider, HStack } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import {
  BackgroundPrimary,
  BackgroundSecondary,
  Primary,
  TextTertiary,
} from "../../components/Colors";
import { useIsFocused } from "@react-navigation/native";
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
  const { showTab, id } = useContext(AuthContext);
  const isFocused = useIsFocused();
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [load, setLoad] = useState(false);
  const [notFound, setNotFound] = useState(false);

  function incrementCount() {
    if (count < cota_total) {
      setCount(count + 1);
      updateTotal();
    }
  }

  function decrementCount() {
    if (count > 1) {
      setCount(count - 1);
      updateTotal();
    }
  }

  function incrementMonth() {
    if (countMonths < semana) {
      setCountMonths(countMonths + 1);
      updateTotal();
    }
  }

  function decrementMonth() {
    if (countMonths > 1) {
      setCountMonths(countMonths - 1);
      updateTotal();
    }
  }

  function updateTotal() {
    setTotal(count * valor * countMonths);
  }
  console.error({ co: cota_total, ca: user.carteira, t: total });

  useEffect(() => {
    if (isFocused) {
      showTab("none");
      setTotal(count * valor * countMonths);
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
  async function handleBuy() {
    // Set the loading state to true to indicate that the purchase request is being processed
    setLoad(true);

    try {
      // Validate that the user has enough balance in their wallet to make the purchase
      if (user.carteira < total) {
        setNotFound(true);
        throw new Error("You don't have sufficient balance!");
      }

      // Validate that there is enough quantity of the product to fulfill the purchase
      if (cota_total < count) {
        throw new Error("Product is sold out!");
      }

      // Make a POST request to the API to initiate the purchase
      const compra = await axios.post("https://api.rutherles.com/api/compra", {
        user_id: id,
        valor: valor,
        imagem_small: imagem_small,
        nome: nome,
        dezenas: dezenas,
        data: data,
        concurso: concurso,
        premiacao: premiacao,
        descricao: descricao,
        imagem: imagem,
        jogo_id: jogo_id,
        status: status,
        semana: semana,
      });
      // Make a PUT request to update the user's wallet balance in the database
      await axios.put(`https://api.rutherles.com/api/usuario/${id}`, {
        carteira: user.carteira - total,
      });

      // Make a PUT request to update the product's quantity in the database
      await axios.put(`https://api.rutherles.com/api/jogo/${jogo_id}`, {
        cota_total: cota_total - count,
      });

      // Navigate the user to the "Profile" screen
      navigation.navigate("Profile");

      // Close the purchase modal
      onClose();

      // Set the loading state to false to indicate that the purchase request has completed
      setLoad(false);
    } catch (error) {
      // If there is an error, log it to the console and set the loading state to false
      console.error(error);
      setLoad(false);
    }
  }

  if (!user) {
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
              height={130}
              justifyContent={"center"}
            >
              <Image
                style={styles.lastImage}
                source={{
                  uri:
                    "https://api.rutherles.com/bolao/pages/uploads/" + imagem,
                }}
                alt=""
              />
            </Box>
            <Box
              backgroundColor={BackgroundSecondary}
              borderRadius={20}
              alignItems={"center"}
              style={styles.cardHost}
              width={150}
              height={130}
              justifyContent={"center"}
            >
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
                <Text style={styles.cardInfoName}> {user.nome}</Text>
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
            <Text style={styles.cardInfoName}>{nome}</Text>
          </Box>
          <Divider color={TextTertiary} marginVertical={15} />

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
                onPress={decrementCount}
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
                onPress={incrementCount}
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
                onPress={decrementMonth}
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
                onPress={incrementMonth}
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
            <HStack justifyContent={"space-around"} alignItems={"center"}>
              <HStack alignItems={"center"}>
                <AntDesign name="table" size={24} color="black" />
                <Text ml={4} style={styles.cardInfo}>
                  Tabela
                </Text>
              </HStack>
              <Image
                w={100}
                h={100}
                alt=""
                source={{
                  uri:
                    "https://api.rutherles.com/bolao/pages/uploads/" + arquivos,
                }}
              />
            </HStack>
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
        {notFound ? (
          <Center>
            <Modal isOpen={isOpen} onClose={onClose}>
              <Modal.Content width={"70%"}>
                <Modal.CloseButton />
                <Modal.Header fontSize="4xl" fontWeight="bold">
                  Ops! Houve um erro.
                </Modal.Header>

                <Modal.Body fontSize="4x2">
                  <Image
                    alt=""
                    width={50}
                    height={50}
                    alignSelf="center"
                    mb={5}
                    source={require("../../../assets/img/error.gif")}
                  />

                  <Text>
                    O saldo da sua conta é insuficiente para participar deste
                    sorteio.
                  </Text>
                </Modal.Body>
                <Modal.Footer>
                  {load ? (
                    <Button
                      backgroundColor={Primary}
                      isLoading
                      isLoadingText="Aguarde..."
                    ></Button>
                  ) : (
                    <Button
                      backgroundColor={Primary}
                      onPress={() => navigation.navigate("Wallet")}
                    >
                      Recarregue agora!
                    </Button>
                  )}
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
                    O saldo da sua conta é de R$ {user.carteira}. Deseja
                    finalizar a compra?
                  </Text>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="unstyled" mr="1" onPress={onClose}>
                    Cancelar
                  </Button>
                  {load ? (
                    <Button
                      backgroundColor={Primary}
                      isLoading
                      isLoadingText="Aguarde..."
                    ></Button>
                  ) : (
                    <Button backgroundColor={Primary} onPress={handleBuy}>
                      Confirmar
                    </Button>
                  )}
                </Modal.Footer>
              </Modal.Content>
            </Modal>
          </Center>
        )}
      </SafeAreaView>
    );
  }
}
