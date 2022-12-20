import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AuthContext } from "../../context/auth";

export function handleSignin(data) {
  const { PutSignedIn } = useContext(AuthContext);

  const storeUser = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@user", jsonValue);
    } catch (e) {}
  };
  const options = {
    method: "POST",
    url: "https://rutherles.site/api/login",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: { email: data.email, password: data.password },
  };

  axios
    .request(options)
    .then(function (response) {
      storeUser(response.data.user);
      PutSignedIn(true);
    })

    .catch(function (error) {
      console.error("n foi");
      setLoad(false);
      setErro("Email ou senha incorretos");
    });
}
