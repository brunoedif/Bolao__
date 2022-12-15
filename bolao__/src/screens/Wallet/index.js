import React, { useState, useContext, useEffect } from "react";
import { Switch } from "react-native";
import {
  Feather,
  MaterialCommunityIcons,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";

import {
  Wrapper,
  Header,
  HeaderContainer,
  Title,
  BalanceContainer,
  Value,
  Bold,
  EyeButton,
  Info,
  Actions,
  Action,
  ActionLabel,
  UseBalance,
  UseBalanceTitle,
  PaymentMethods,
  PaymentMethodsTitle,
  Card,
  CardBody,
  CardDetails,
  CardTitle,
  CardInfo,
  Img,
  AddButton,
  AddLabel,
  UseTicketContainer,
  UseTicketButton,
  UseTicketLabel,
} from "./styles";
import {
  BackgroundSecondary,
  Gradiente,
  Primary,
} from "../../components/Colors";
import creditCard from "../../../assets/img/credit-card.png";
import { AuthContext } from "../../context/auth";
import { useIsFocused } from "@react-navigation/native";
import { Image } from "native-base";

export default function Wallet(route, navigation) {
  const { ShowTab, user, getUser } = useContext(AuthContext);
  const wallet = user.carteira;
  useEffect(() => {
    if (isFocused) {
      ShowTab("visible");
    }
  });
  const isFocused = useIsFocused();

  const [isVisible, setIsVisible] = useState(true);
  const [useBalance, setUseBalance] = useState(true);

  function handleToggleVisibility() {
    setIsVisible((prevState) => !prevState);
  }

  function handleToggleUseBalance() {
    setUseBalance((prevState) => !prevState);
  }

  const { pagamento } = route.params ? route.params : false;

  if (pagamento && load) {
    alert("Depositado com sucesso!");
    setLoad(false);
  }

  useEffect(() => {
    getUser(user.id);
  }, []);

  return (
    <Wrapper>
      <Header
        colors={useBalance ? [Gradiente, Primary] : ["#D3D3D3", "#868686"]}
      >
        <HeaderContainer>
          <Title>Saldo Bolão</Title>

          <BalanceContainer>
            <Value>
              R$ {wallet ? wallet : 0}
              <Bold></Bold>
            </Value>

            <EyeButton onPress={handleToggleVisibility}>
              <Feather
                name={isVisible ? "eye" : "eye-off"}
                size={28}
                color={BackgroundSecondary}
              />
            </EyeButton>
          </BalanceContainer>

          <Actions>
            <Action>
              <MaterialCommunityIcons
                name="cash"
                size={28}
                color={BackgroundSecondary}
              />
              <ActionLabel>Adicionar</ActionLabel>
            </Action>
          </Actions>
        </HeaderContainer>
      </Header>

      <UseBalance>
        <UseBalanceTitle>Usar saldo ao pagar</UseBalanceTitle>

        <Switch value={useBalance} onValueChange={handleToggleUseBalance} />
      </UseBalance>

      <PaymentMethods>
        <PaymentMethodsTitle>Forma de Pagamento</PaymentMethodsTitle>

        <Card>
          <CardBody>
            <CardDetails>
              <CardInfo>
                Faça um Pix para adicionar saldo para poder comprar bilhetes
                quando não tiver saldo.
              </CardInfo>
            </CardDetails>

            <Image
              alt=""
              source={require("../../../assets/img/pix.png")}
              width={100}
              height={35}
            />
          </CardBody>

          <AddButton>
            <AntDesign name="pluscircleo" size={30} color={Primary} />
            <AddLabel>Adicionar Saldo</AddLabel>
          </AddButton>
        </Card>

        <UseTicketContainer>
          <UseTicketButton>
            <MaterialCommunityIcons
              name="ticket-outline"
              size={20}
              color={Primary}
            />
            <UseTicketLabel>Usar código promocional</UseTicketLabel>
          </UseTicketButton>
        </UseTicketContainer>
      </PaymentMethods>
    </Wrapper>
  );
}
