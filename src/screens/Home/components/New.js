import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Shaddow } from "../../../components/Colors";

export default function New(props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <Image source={{ uri: props.cover }} style={styles.cover} />

      <View style={styles.content}>
        <Text style={styles.title}>{props.name}</Text>

        <View style={styles.dot}></View>

        <Text style={styles.badge}>{props.status}</Text>
      </View>

      <Text style={styles.description}>{props.description}</Text>

      <View style={styles.footer}>
        <View style={{ width: "80%" }}>
          <Text style={styles.price}>R$ {props.valor}</Text>
        </View>

        <View style={{ width: "20%" }}>
          <Ionicons name="ios-add-circle" size={24} color="black" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: "#FFF",
    height: 250,
    width: 200,
    elevation: 2,
    borderRadius: 20,
    padding: 15,
    marginHorizontal: 5,
    marginBottom: 5,

    shadowColor: Shaddow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  cover: {
    width: 170,
    height: 110,
    borderRadius: 10,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  title: {
    fontSize: 12,
    color: "#4f4a4a",
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 4,
    backgroundColor: "red",
    marginHorizontal: 4,
  },
  badge: {
    color: "red",
    fontSize: 9,
  },
  description: {
    fontSize: 9,
    color: "#4f4a4a",
    height: 40,
  },
  footer: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
    width: "100%",
  },
  price: {
    fontSize: 15,
  },
});