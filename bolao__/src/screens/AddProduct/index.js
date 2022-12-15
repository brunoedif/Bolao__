import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";

import {
  View,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Box,
  Image,
  Text,
  Avatar,
  Divider,
  HStack,
  InputGroup,
  InputLeftAddon,
  Input,
  Select,
  CheckIcon,
  KeyboardAvoidingView,
  FormControl,
  WarningOutlineIcon,
} from "native-base";
import { MaterialIcons, AntDesign, Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { Last } from "./components/Consts";
import { useForm, Controller } from "react-hook-form";
import { useIsFocused } from "@react-navigation/native";
import {
  BackgroundPrimary,
  Primary,
  TextTertiary,
  TextTitle,
} from "../../components/Colors";
import { Title } from "../Wallet/styles";
export default function AddProduct() {
  const [count, setCount] = useState(1);
  const [countMonths, setCountMonths] = useState(1);
  const data = Last.map((item) => item);
  const [service, setService] = React.useState("");
  function handleClickAddPlace() {
    if (count < 5) {
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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      price: "",
    },
  });
  const { ShowTab } = useContext(AuthContext);

  useEffect(() => {
    if (isFocused) {
      ShowTab("none");
    }
  });
  const isFocused = useIsFocused();

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({
        ios: "padding",
        android: null,
      })}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView backgroundColor={BackgroundPrimary}>
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
            w="100%"
          >
            <Box pb={4} px={4}>
              <FormControl isRequired>
                <FormControl.Label>
                  Vamos começar, selecione o serviço
                </FormControl.Label>
                <Select
                  variant="underlined"
                  minWidth="200"
                  accessibilityLabel="Choose Service"
                  placeholder="Serviço"
                  _selectedItem={{
                    bg: "teal.600",
                  }}
                  mt="1"
                >
                  <Select.Item label="UX Research" value="ux" />
                  <Select.Item label="Web Development" value="web" />
                  <Select.Item
                    label="Cross Platform Development"
                    value="cross"
                  />
                  <Select.Item label="UI Designing" value="ui" />
                  <Select.Item label="Backend Development" value="backend" />
                </Select>
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  Please make a selection!
                </FormControl.ErrorMessage>
              </FormControl>
            </Box>
            <Divider color={TextTertiary} />
            <Box pb={4} px={4}>
              <FormControl isRequired>
                <FormControl.Label>
                  Qual a categoria do serviço?
                </FormControl.Label>
                <Select
                  variant="underlined"
                  minWidth="200"
                  accessibilityLabel="Choose Service"
                  placeholder="Categoria"
                  _selectedItem={{
                    bg: "teal.600",
                  }}
                  mt="1"
                >
                  <Select.Item label="UX Research" value="ux" />
                  <Select.Item label="Web Development" value="web" />
                  <Select.Item
                    label="Cross Platform Development"
                    value="cross"
                  />
                  <Select.Item label="UI Designing" value="ui" />
                  <Select.Item label="Backend Development" value="backend" />
                </Select>
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  Please make a selection!
                </FormControl.ErrorMessage>
              </FormControl>
            </Box>
            <Divider color={TextTertiary} />
            <Box
              py={2}
              px={4}
              justifyContent={"space-between"}
              flexDirection={"row"}
              alignItems={"center"}
            >
              <Text key={data.key6} style={styles.title}>
                Mensalidade:
              </Text>

              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                name="price"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onChangeText={onChange}
                    value={value}
                    placeholder="R$"
                    autoCapitalize={false}
                    autoCorrect={false}
                    width={"33%"}
                    height={42}
                    returnKeyType="next"
                    variant="underlined"
                    keyboardType="email-address"
                  />
                )}
              />
              {errors.price && <Text style={styles.error}>Insira o preço</Text>}
            </Box>
            <Divider color={TextTertiary} />
            <Box
              py={4}
              px={4}
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Text key={data.key6} style={styles.title}>
                Vagas:
              </Text>

              <HStack width={"21%"} justifyContent={"space-between"}>
                <TouchableOpacity
                  onPress={handleClickSubtractPlace}
                  color={TextTertiary}
                >
                  <Ionicons
                    name="md-remove-circle-outline"
                    size={25}
                    color="black"
                  />
                </TouchableOpacity>
                <Text color={TextTertiary} fontSize={15}>
                  {count}
                </Text>
                <TouchableOpacity
                  onPress={handleClickAddPlace}
                  color={TextTertiary}
                >
                  <Ionicons
                    name="ios-add-circle-outline"
                    size={25}
                    color="black"
                  />
                </TouchableOpacity>
              </HStack>
            </Box>
            <Divider />
            <Box
              py={4}
              px={4}
              flexDirection={"row"}
              justifyContent={"space-between"}
            >
              <Text key={data.key6} style={styles.title}>
                Duração em meses:
              </Text>
              <HStack width={"21%"} justifyContent={"space-between"}>
                <TouchableOpacity
                  onPress={handleClickSubtractMonth}
                  color={TextTertiary}
                >
                  <Ionicons
                    name="md-remove-circle-outline"
                    size={25}
                    color="black"
                  />
                </TouchableOpacity>
                <Text style={styles.title} fontSize={15}>
                  {countMonths}
                </Text>
                <TouchableOpacity
                  onPress={handleClickAddMonth}
                  color={TextTertiary}
                >
                  <Ionicons
                    name="ios-add-circle-outline"
                    size={25}
                    color="black"
                  />
                </TouchableOpacity>
              </HStack>
            </Box>
            <Divider />
            <Box px={4} py={4}>
              <FormControl isRequired>
                <FormControl.Label>Como vai enviar o acesso?</FormControl.Label>
                <Select
                  color={TextTitle}
                  variant="underlined"
                  minWidth="200"
                  accessibilityLabel="Choose Service"
                  placeholder="Acesso"
                  _selectedItem={{
                    bg: Primary,
                  }}
                  mt="1"
                >
                  <Select.Item label="UX Research" value="ux" />
                  <Select.Item label="Web Development" value="web" />
                  <Select.Item
                    label="Cross Platform Development"
                    value="cross"
                  />
                  <Select.Item label="UI Designing" value="ui" />
                  <Select.Item label="Backend Development" value="backend" />
                </Select>
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  Please make a selection!
                </FormControl.ErrorMessage>
              </FormControl>
            </Box>
            <Divider />
            <Box px={4} py={4}>
              <Text pb={2} style={styles.title}>
                Descrição:
              </Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                name="description"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onChangeText={onChange}
                    value={value}
                    placeholder="Descrição do serviço"
                    autoCapitalize={false}
                    autoCorrect={false}
                    height={"auto"}
                    returnKeyType="go"
                    variant="underlined"
                    keyboardType="email-address"
                  />
                )}
              />
              {errors.description && (
                <Text style={styles.error}>Insira uma descrição</Text>
              )}
            </Box>
            <Box mb={4} px={4}>
              <Text pb={2} style={styles.title}>
                Regras:
              </Text>
              <Text style={styles.text}>
                Não compartilhe a senha com ninguém fora deste grupo de
                assinatura. {"\n"}
                Não utilize esta conta compartilhada para postar em nome de
                outros. {"\n"}
                Não altere a senha do grupo. {"\n"}
              </Text>
            </Box>
            <Box w={"100%"} alignSelf={"center"}>
              <TouchableOpacity style={styles.buttom}>
                <Text style={styles.textButtom}>Publicar</Text>
              </TouchableOpacity>
            </Box>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
