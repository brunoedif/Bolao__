import { StyleSheet } from "react-native";
import {
  BackgroundSecondary,
  TextTertiary,
  Primary,
  Shaddow,
  BackgroundPrimary,
  TextSubTitle,
} from "../../../src/components/Colors.js";
export default StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: BackgroundSecondary,
    justifyContent: "flex-start",
  },

  HeaderTop: {
    backgroundColor: BackgroundSecondary,
    flexDirection: "row",

    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",

    paddingBottom: 10,
  },
  Header: {
    width: "100%",
    height: "25%",
    paddingHorizontal: 10,
    paddingBottom: 20,

    backgroundColor: BackgroundSecondary,
  },
  avatar: {
    width: 40,
    height: 40,
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
    paddingBottom: 20,
  },
  footerTitle: {
    flexDirection: "row",
    justifyContent: "space-between",

    fontFamily: "roboto-medium",
    color: TextTertiary,
    fontSize: 16,
  },
  scrollTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    fontFamily: "roboto-medium",
    color: TextTertiary,
    fontSize: 16,
    marginBottom: 10,
  },

  touchTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    fontFamily: "roboto",
    color: TextTertiary,
    fontSize: 14,
  },
  filter: { paddingVertical: 10 },
  footerText: {
    color: Primary,
    fontFamily: "roboto-medium",
    fontSize: 16,
  },
  filterOptions: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",

    paddingVertical: 5,
    marginRight: 10,
    shadowColor: Shaddow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.22,
    alignItems: "center",
    justifyContent: "center",

    borderWidth: 1,
  },
  filterOptionsText: {
    color: TextTertiary,
    fontFamily: "roboto",
    color: TextTertiary,
    fontSize: 14,
    paddingHorizontal: 15,
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
    margin: 10,
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
  },
  categories: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  categoriesView: { marginVertical: 10 },
  scroll: {
    backgroundColor: BackgroundPrimary,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 200,
  },
  cardContainerRight: {
    width: "49.5%",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainerLeft: { width: "49.5%" },
  cardContentLeft: {
    width: "95%",
    height: "100%",
    shadowColor: Shaddow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    justifyContent: "space-around",
    backgroundColor: BackgroundSecondary,
    borderRadius: 20,
  },
  cardContentRightTop: {
    width: "100%",
    height: "50%",
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
    width: "100%",
    height: "50%",
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
    height: "50%",
    width: "50%",

    alignSelf: "center",
    marginTop: "15%",
  },
  cardImageRight: {
    resizeMode: "cover",
    width: 150,
    height: 45,
    marginTop: 10,
  },
  cardTitle: {
    marginBottom: 20,
    fontFamily: "roboto-medium",
    color: TextTertiary,
    fontSize: 16,
  },
  filterTitle: {
    fontFamily: "roboto-medium",
    color: TextTertiary,
    fontSize: 16,
  },
  lastText: {
    fontFamily: "roboto-medium",
    color: TextSubTitle,
    fontSize: 16,
  },
  lastTitleView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
    fontFamily: "roboto-medium",
    color: TextSubTitle,
    fontSize: 16,
  },
  lastTitle: {
    fontFamily: "roboto-medium",
    color: TextSubTitle,
    fontSize: 16,
  },
  lastText: {
    fontFamily: "roboto-medium",
    color: Primary,
    fontSize: 16,
  },
  cardInfoLeft: {
    fontFamily: "roboto",
    color: TextTertiary,
    fontSize: 16,
    alignSelf: "center",
    marginBottom: -10,
  },
  cardInfoRight: {
    fontFamily: "roboto",
    color: TextTertiary,
    fontSize: 16,
  },
  cardInfo: {
    fontFamily: "roboto",
    color: TextTertiary,
    fontSize: 16,
  },
  cardInfoResume: {
    fontFamily: "roboto",
    color: TextSubTitle,
    fontSize: 16,
  },
  cardInfoResumeTitle: {
    fontFamily: "roboto",
    color: TextSubTitle,
    fontSize: 16,
  },
  productCard: { justifyContent: "space-between" },
  infoText: {
    color: BackgroundSecondary,
    fontSize: 16,
    fontFamily: "roboto-medium",
  },
  infoButton: {
    marginTop: 15,
    backgroundColor: Primary,
    width: "77.8%",
    height: 42,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  placesButtons: {},
  buttom: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BackgroundSecondary,
  },
  cardProductInfoName: {
    fontFamily: "roboto-medium",
    color: TextSubTitle,
    fontSize: 16,
    alignSelf: "center",
    marginTop: 10,
  },
  cardInfoName: {
    fontFamily: "roboto-medium",
    color: TextSubTitle,
    fontSize: 16,
    alignSelf: "center",
    marginTop: 10,

    paddingBottom: 10,
  },
  lastContainer: {
    backgroundColor: BackgroundPrimary,
    borderRadius: 20,
    paddingBottom: 20,
  },
  lastImage: {
    width: 80,
    height: 60,
  },
  lastContent: {
    width: "45%",
    height: 180,
    shadowColor: Shaddow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    backgroundColor: BackgroundSecondary,
    borderRadius: 20,
    margin: "2.5%",
    alignItems: "center",
    justifyContent: "center",
  },
  productTitle: {},
  productInfo: {},
  cardHost: {
    shadowColor: Shaddow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
});
