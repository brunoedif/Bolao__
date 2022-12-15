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
import { BackgroundSecondary, Primary } from "../../components/Colors";
import creditCard from "../../../assets/img/credit-card.png";
import { AuthContext } from "../../context/auth";
import { useIsFocused } from "@react-navigation/native";
export default function Wallet() {
  const { ShowTab, informacoes } = useContext(AuthContext);

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

  return (
    <Wrapper>
      <Header
        colors={useBalance ? ["#6699eb", Primary] : ["#D3D3D3", "#868686"]}
      >
        <HeaderContainer>
          <Title>Saldo Grupou</Title>

          <BalanceContainer>
            <Value>
              R$ <Bold>{isVisible ? "150,00" : "----"}</Bold>
            </Value>

            <EyeButton onPress={handleToggleVisibility}>
              <Feather
                name={isVisible ? "eye" : "eye-off"}
                size={28}
                color={BackgroundSecondary}
              />
            </EyeButton>
          </BalanceContainer>

          <Info>Seu saldo pode ser retirado a qualquer momento!</Info>

          <Actions>
            <Action>
              <MaterialCommunityIcons
                name="cash"
                size={28}
                color={BackgroundSecondary}
              />
              <ActionLabel>Adicionar</ActionLabel>
            </Action>

            <Action>
              <FontAwesome name="bank" size={20} color={BackgroundSecondary} />
              <ActionLabel>Retirar</ActionLabel>
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
              <CardTitle>Cadastre seu cartão de crédito</CardTitle>
              <CardInfo>
                Cadastre um cartão de crédito para poder comprar grupos quando
                não tiver saldo.
              </CardInfo>
            </CardDetails>

            <Img source={creditCard} resizeMode="contain" />
          </CardBody>

          <AddButton>
            <AntDesign name="pluscircleo" size={30} color={Primary} />
            <AddLabel>Adicionar cartão de crédito</AddLabel>
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
