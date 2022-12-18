import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export function GetUserId() {
  const [id, setId] = useState(1);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("@user");
        if (value !== null) {
          let users = JSON.parse(value);
          console.log(users[0].id);
          setId(users[0].id);
        }
      } catch (e) {
        // error reading value
      }
    };

    getData();
  }, []);

  return { id };
}
