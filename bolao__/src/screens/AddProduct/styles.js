import { StyleSheet } from "react-native";
import react, { useEffect } from "react";
import {
  BackgroundPrimary,
  BackgroundSecondary,
  Error,
  Primary,
  TextPrimary,
  TextSecondary,
  TextTertiary,
  TextTitle,
} from "../../components/Colors";
import {
  PrimaryFontFamily,
  SecondaryFontFamily,
} from "../../components/FontFamily";
import {
  SecondaryFontSize,
  PrimaryFontSize,
  TertiaryFontSize,
} from "../../components/FontSize";

export default StyleSheet.create({
  content: { marginTop: "-5%" },
  title: {
    fontFamily: PrimaryFontFamily,
    color: TextTitle,
    fontSize: SecondaryFontSize,
  },

  text: {
    color: TextTertiary,
    fontSize: SecondaryFontSize,
    fontFamily: PrimaryFontFamily,
  },
  buttom: {
    backgroundColor: Primary,
    width: "77.8%",
    height: 42,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 10,
  },
  textButtom: {
    color: TextSecondary,
    fontSize: SecondaryFontSize,
    fontFamily: PrimaryFontFamily,
  },
  error: { color: Error, alignSelf: "center" },
  create: {
    fontFamily: SecondaryFontFamily,
    fontSize: TertiaryFontSize,
    color: TextTitle,
  },
});
