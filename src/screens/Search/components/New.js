import { StyleSheet } from "react-native";
import { Shaddow } from "../../../components/Colors";
export default StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: "#FFF",
    height: 240,
    width: "48%",
    elevation: 2,
    borderRadius: 20,
    padding: 5,
    marginHorizontal: "1%",
    marginBottom: 5,

    shadowColor: Shaddow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  cover: {
    width: "100%",
    height: "50%",
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
    lineHeight: 10,
    height: 40,
  },
  footer: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
    width: "80%",
    paddingLeft: "10%",
  },
  price: {
    fontSize: 15,
  },
});
