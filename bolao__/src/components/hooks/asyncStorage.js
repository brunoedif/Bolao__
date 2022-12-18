import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export function GetUserId() {
  const [id, setId] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("@user");
        if (value !== null) {
          let users = JSON.parse(value);

          setId(users[0].id);
        }
      } catch (e) {
        alert(
          "Não foi possível carregar os dados, verifique sua conexão com a internet"
        );
      }
    };

    getData();
  });

  return { id };
}
