import axios from "axios";
import { getLocalUser } from "./asyncStorage";
import React, { useEffect, useState } from "react";

export default function onUser() {
  const [user, setUser] = useState([]);
  const { localUserId } = getLocalUser([]);
  console.error(user.carteira);
  useEffect(() => {
    function getUser() {
      const options = {
        method: "GET",
        url: "https://rutherles.site/api/usuario/" + localUserId,
        headers: { "Content-Type": "application/json" },
      };

      axios
        .request(options)
        .then(function (response) {
          setUser(response.data[0]);
          console.error("user resquisition success");
        })
        .catch(function (error) {
          console.error("user resquisition error");
        });
    }
    getUser();
  }, []);
  return { user };
}
