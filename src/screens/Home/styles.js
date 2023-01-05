import { StyleSheet } from "react-native";
import {
  BackgroundPrimary,
  BackgroundSecondary,
  Primary,
  Shaddow,
  TextPrimary,
  TextSubTitle,
  TextTertiary,
  TextTitle,
} from "../../components/Colors";
import {
  PrimaryFontFamily,
  SecondaryFontFamily,
} from "../../components/FontFamily";
import { PrimaryFontSize, SecondaryFontSize } from "../../components/FontSize";

export default StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: BackgroundPrimary,
    justifyContent: "flex-start",
  },

  HeaderTop: {
    backgroundColor: BackgroundSecondary,
    flexDirection: "row",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "-5%",
  },
  Header: {
    width: "100%",
    height: "10%",
    paddingHorizontal: 10,
    paddingBottom: 20,

    backgroundColor: BackgroundSecondary,
  },
  avatar: {
    width: 40,
    height: 40,
  },

  inputHead: {},
  HeaderLeft: {
    width: "70%",
    marginTop: "10%",
  },
  rigthHeader: {
    marginTop: "10%",
    flexDirection: "row",
    alignItems: "center",
    width: "20%",
    justifyContent: "space-between",
  },
  icon: {
    color: TextTertiary,
    fontSize: 25,
  },
  footerHeader: {
    paddingBottom: 20,
  },

  filterOptions: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },

  bannerLeft: {
    alignSelf: "flex-start",
  },
  bannerRightTop: {
    alignSelf: "flex-start",
  },
  bannerRightBottom: {
    alignSelf: "flex-start",
  },
  categorieTouch: {
    width: 50,
    height: 50,
    marginX: 10,
    borderRadius: 100,
    alignItems: "center",
    shadowColor: Shaddow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BackgroundSecondary,
    marginBottom: 10,
  },
  categories: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    borderRadius: 100,
  },
  categoriesView: {},
  scroll: {
    backgroundColor: BackgroundPrimary,

    paddingHorizontal: 10,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 200,
  },
  cardContainerRight: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  cardContainerLeft: { width: "49.5%" },
  cardContentLeft: {
    width: "95%",
    height: "82%",
    shadowColor: Shaddow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    alignSelf: "center",
    justifyContent: "space-around",
    backgroundColor: BackgroundSecondary,
    borderRadius: 20,
  },
  cardContentRightTop: {
    width: "80%",
    height: "40%",
    shadowColor: Shaddow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: BackgroundSecondary,
    borderRadius: 20,
    marginBottom: "3%",
  },
  cardContentRightBottom: {
    width: "80%",
    height: "40%",
    shadowColor: Shaddow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: BackgroundSecondary,
    borderRadius: 20,
  },
  cardImageLeft: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    resizeMode: "cover",
    borderRadius: 20,
  },
  cardImageRight: {
    resizeMode: "center",
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },

  title: {
    fontFamily: SecondaryFontFamily,
    color: TextTertiary,
    fontSize: SecondaryFontSize,
    paddingTop: 20,
    paddingBottom: 25,
  },
  subTitle: {
    fontFamily: PrimaryFontFamily,
    color: TextTertiary,
    fontSize: SecondaryFontSize,
  },
  name: {
    fontFamily: PrimaryFontFamily,
    color: TextTertiary,
    fontSize: SecondaryFontSize,
    textAlign: "flex-start",
    paddingHorizontal: 10,
  },
  description: {
    fontSize: 10,
    color: TextTertiary,
    letterSpacing: 0.1,
    lineHeight: 15,
    textAlign: "flex-start",
    paddingHorizontal: 5,
  },

  titleAll: {
    fontFamily: SecondaryFontFamily,
    color: TextPrimary,
    fontSize: SecondaryFontSize,
    paddingTop: 20,
    paddingBottom: 20,
  },
  flatLabel: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 10,
  },

  lastContainer: {
    backgroundColor: BackgroundPrimary,
    borderRadius: 20,
  },
  cardImage: {
    width: 80,
    height: 80,
    marginTop: 20,
    alignSelf: "center",
  },
  card: {
    width: 200,
    height: 250,
    shadowColor: Shaddow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    backgroundColor: BackgroundSecondary,
    borderRadius: 20,

    justifyContent: "space-around",
    marginHorizontal: 5,
    marginTop: 5,
    marginBottom: 20,
  },
});
