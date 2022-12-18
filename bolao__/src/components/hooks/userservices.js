import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import api from "../hooks/api";

class UsuarioService {
  async cadastrar(data) {
    return axios({
      url: api.API_URL + "usuario/cadastrar",
      method: "POST",
      timeout: api.TIMEOUT_REQUEST,
      data: data,
      headers: api.HEADER_REQUEST,
    })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  async login(data) {
    return axios({
      url: api.API_URL + "login",
      method: "POST",
      timeout: api.TIMEOUT_REQUEST,
      data: data,
      headers: api.HEADER_REQUEST,
    })
      .then(function (response) {
        storeUser(response.data.user[0]);
        setToken(response.data.authorisation.token);
        console.error(response);
        getUser(response.data.user[0].id);
        global.id = response.data.user[0].id;
        global.user = response.data.user[0];
        navigation.navigate("tab");
        console.error(response);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  async loginComToken(data) {
    return axios({
      url: api.API_URL + "usuario/login-token",
      method: "POST",
      timeout: api.TIMEOUT_REQUEST,
      data: data,
      headers: api.HEADER_REQUEST,
    })
      .then((response) => {
        if (response.data.access_token) {
          AsyncStorage.setItem("TOKEN", response.data.access_token);
          return Promise.resolve(response);
        } else {
          return Promise.reject(response);
        }
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}

const usuarioService = new UsuarioService();
export default usuarioService;
