import React, { useState, useContext } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import styles from "./styles";

import { TouchableOpacity } from "react-native";
import { AuthContext } from "../context/auth";

import { useNavigation } from "@react-navigation/native";
import { Icons } from "./Consts";
import { BackgroundSecondary, Primary } from "./Colors";

export default function Appbar() {
  // Get the navigation object and the current screen from the context
  const navigation = useNavigation();
  const { currentScreen } = useContext(AuthContext);

  // Set up state to keep track of the currently selected icon
  const [selected, setSelected] = useState("Home");

  // Function to update the selected icon and navigate to the corresponding screen
  function PutSelected(key) {
    setSelected(key);
    navigation.navigate(key);
  }

  return (
    // Only render the navigation bar if the current screen is not "none"
    <>
      {currentScreen != "none" ? (
        <View style={styles.all}>
          {/* Map over the icons and render a TouchableOpacity for each one */}
          {Icons.map((item) => (
            <TouchableOpacity
              key={item.key}
              onPress={() => PutSelected(item.key)}
              style={StyleSheet.flatten([
                styles.iconTab,
                {
                  // Set the border color based on whether the icon is selected
                  borderBottomColor:
                    selected == item.key ? BackgroundSecondary : Primary,
                },
              ])}
            >
              <ImageBackground
                style={styles.icon}
                alt=""
                // Use the correct image based on whether the icon is selected
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
