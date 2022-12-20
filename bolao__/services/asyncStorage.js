import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export function getLocalUser() {
  const [localUserId, setLocalUserId] = useState("");
  const [localUser, setLocalUser] = useState([]);
  useEffect(() => {
    const getLocalUser = async () => {
      try {
        const value = await AsyncStorage.getItem("@user");
        if (value !== null) {
          let users = JSON.parse(value);
          console.log("ASYNC");
          setLocalUserId(users[0].id);
          setLocalUser(users[0]);
        }
      } catch (e) {
        alert(
          "Não foi possível carregar os dados, verifique sua conexão com a internet"
        );
      }
    };

    getLocalUser();
  }, []);

  return { localUserId, localUser };
}
