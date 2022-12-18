import { HStack, Image, Center, Box } from "native-base";
import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { AuthContext } from "../context/auth";

import { useNavigation } from "@react-navigation/native";
import { Icons } from "./Consts";
import { BackgroundSecondary, Primary } from "./Colors";

export default function Appbar() {
  const navigation = useNavigation();
  const { PutScreen, screen } = useContext(AuthContext);
  const [selected, setSelected] = useState("Home");

  function PutSelected(key) {
    setSelected(key);
    navigation.navigate(key);
  }

  return (
    <>
      {screen != "none" ? (
        <View style={styles.all}>
          {Icons.map((item) => (
            <TouchableOpacity
              key={item.key}
              onPress={() => PutSelected(item.key)}
              style={StyleSheet.flatten([
                styles.iconTab,
                {
                  borderBottomColor:
                    selected == item.key ? BackgroundSecondary : Primary,
                },
              ])}
            >
              <ImageBackground
                style={styles.icon}
                alt=""
                source={selected == item.key ? item.source : item.static}
              />
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <></>
      )}
    </>
  );
}
