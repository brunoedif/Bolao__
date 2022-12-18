import React, { useState, useContext, useEffect } from "react";
import { Switch, TouchableOpacity } from "react-native";
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
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Image } from "native-base";

export default function Wallet(route) {
  const navigation = useNavigation();
  const { user, ShowTab } = useContext(AuthContext);
  const [load, setLoad] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
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
    ShowTab("visible");
  });

  return (
    <Wrapper>
      <Header
        colors={useBalance ? [Gradiente, Primary] : ["#D3D3D3", "#868686"]}
      >
        <HeaderContainer>
          <Title>Saldo Bolão</Title>

          <BalanceContainer>
            <Value>
              R$
              <Bold>
                {isVisible ? user[0].carteira : "----"}
                {isVisible ? ",00" : <></>}
              </Bold>
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
              <TouchableOpacity
                onPress={() => navigation.navigate("Pix")}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <MaterialCommunityIcons
                  name="cash"
                  size={28}
                  color={BackgroundSecondary}
                />
                <ActionLabel>Adicionar</ActionLabel>
              </TouchableOpacity>
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
            <TouchableOpacity onPress={() => navigation.navigate("Pix")}>
              <AddLabel>Adicionar Saldo</AddLabel>
            </TouchableOpacity>
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
