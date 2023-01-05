import { StyleSheet } from "react-native";
import { SecondaryFontFamily } from "../../components/FontFamily";
import { TertiaryFontSize } from "../../components/FontSize";
import {
  BackgroundSecondary,
  Primary,
  Shaddow,
  TextTertiary,
} from "../../components/Colors";
export default StyleSheet.create({
  add: {
    backgroundColor: Primary,
    width: 80,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  addvalue: { color: "#fff", fontSize: 22, fontWeight: "600" },
  retirar: {
    backgroundColor: Primary,
    width: "70%",
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    alignSelf: "center",
  },
  LoginV: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BackgroundSecondary,
    width: "90%",
    height: "90%",
    borderRadius: 20,
    elevation: 3,
    shadowColor: Shaddow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    alignSelf: "center",
  },
  input: {
    height: 40,
    width: "50%",
    margin: 12,
    borderWidth: 0,
  },
  btnSubmit: {
    backgroundColor: "#0ed830",
    width: "50%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    marginTop: 20,
    marginBottom: "25%",
  },
  btnSubmitText: {
    color: TextTertiary,
  },
  btnRegister: {
    marginTop: 10,
  },
  RegisterText: {
    color: TextTertiary,
    fontWeight: "bold",
  },
  valor: {
    fontFamily: SecondaryFontFamily,
    fontSize: TertiaryFontSize,
  },
  valorFixo: {
    backgroundColor: "#0ed830",
    width: 60,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
  },
  fixo: {
    color: TextTertiary,
    textAlign: "center",

    marginTop: "auto",
    marginBottom: "auto",
    fontFamily: SecondaryFontFamily,
    fontSize: TertiaryFontSize,
  },
  title1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",

    textAlign: "center",
    color: "#000",
  },
  iconRight: {
    fontSize: 20,
    marginLeft: 20,
    marginRight: -35,

    color: "#000",
  },
  loginButton: {
    marginTop: 15,
    backgroundColor: Primary,
    width: "77.71%",
    height: 42,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: "15%",
  },
  loginText: {
    color: BackgroundSecondary,
  },
});
