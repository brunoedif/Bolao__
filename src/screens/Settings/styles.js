import { StyleSheet } from "react-native";
import {
  BackgroundPrimary,
  BackgroundSecondary,
  Error,
  Primary,
  Shaddow,
  TextPrimary,
  TextSecondary,
  TextSubTitle,
  TextTertiary,
  TextTitle,
} from "../../components/Colors";
import {
  SecondaryFontFamily,
  TertiaryFontFamily,
  PrimaryFontFamily,
} from "../../components/FontFamily";
import {
  SecondaryFontSize,
  TertiaryFontSize,
  PrimaryFontSize,
} from "../../components/FontSize";

export default StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: BackgroundPrimary,
  },
  content: { paddingHorizontal: 10 },

  text: {
    color: TextTertiary,
    fontFamily: PrimaryFontFamily,
    fontSize: SecondaryFontSize,
  },

  textLogout: {
    color: Error,
    fontFamily: PrimaryFontFamily,
    fontSize: SecondaryFontSize,
  },
  share: {
    color: TextPrimary,
    fontFamily: PrimaryFontFamily,
    fontSize: PrimaryFontSize,
    marginTop: 15,
    textAlign: "center",
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,

    paddingHorizontal: 10,
  },
  cardContainer: {
    justifyContent: "space-between",

    marginVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 20,
    shadowColor: Shaddow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  avatar: {
    paddingVertical: 10,
    alignSelf: "center",
    flexDirection: "row",
  },
  logoHead: {
    marginTop: "10%",
    color: TextTertiary,
    fontSize: 25,
  },

  inputHead: {},
  HeaderTouchable: {
    width: "70%",
    marginTop: "10%",
  },
  rigthHeader: {
    marginTop: "10%",
    flexDirection: "row",
    alignItems: "center",
    width: "21%",
    justifyContent: "space-between",
  },
  icon: {
    color: TextTertiary,
    fontSize: 25,
  },
  footerHeader: {
    paddingBottom: "3%",
    backgroundColor: BackgroundSecondary,
  },
  footerTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  filter: { marginHorizontal: 15, marginTop: 10 },
  footerText: {
    color: Primary,
  },
  filterOptions: {
    marginHorizontal: 5,
    borderRadius: 10,
    width: 110,
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    borderWidth: 1,
  },
  filterOptionsText: {
    color: TextSubTitle,
  },
  name: {
    paddingHorizontal: 10,
    color: TextTertiary,
    fontSize: TertiaryFontSize,
    fontFamily: SecondaryFontFamily,
  },
  title: {
    color: TextTertiary,
    fontSize: TertiaryFontSize,
    fontFamily: SecondaryFontFamily,
  },
  star: {
    paddingHorizontal: 10,
    color: TextTertiary,
    fontSize: SecondaryFontSize,
    fontFamily: SecondaryFontFamily,
  },
  subTitle: {
    paddingHorizontal: 10,
    color: TextTertiary,
    fontSize: TertiaryFontSize,
    fontFamily: PrimaryFontFamily,
  },
  card: {
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: Shaddow,
    shadowOffset: {
      width: 0,
    },
    shadowOpacity: 0.11,
    shadowRadius: 2.22,
    height: "30%",
    paddingTop: "5%",
  },
});
