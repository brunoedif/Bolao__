import { Platform, StyleSheet } from "react-native";
import { BackgroundSecondary, Primary } from "./Colors";

export default StyleSheet.create({
  all: {
    justifyContent: "space-around",
    height: "8%",
    backgroundColor: Primary,
    flexDirection: "row",
    width: "95%",
    alignSelf: "center",
    borderRadius: 20,
    alignItems: "center",

    position: "relative",
    bottom: "2%",
    marginTop: Platform.OS === "ios" ? "-7%" : 0,
  },

  icon: { width: 35, height: 35 },
  iconTab: {
    width: 35,
    height: 40,
    borderBottomColor: BackgroundSecondary,
    borderBottomWidth: 2,
  },
});
