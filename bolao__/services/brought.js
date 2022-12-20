import axios from "axios";
import { useState, useEffect } from "react";
import onUser from "./onUser";

export function onBrought() {
  const [brougth, setbrought] = useState([]);
  const user = onUser();

  useEffect(() => {
    function getBrought() {
      const get = {
        method: "POST",
        url: "https://rutherles.site/api/compras",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: { user_id: user.user.id },
      };

      axios
        .request(get)
        .then(function (response) {
          setbrought(response.data.compra);
          console.log(response.data.compra);
        })
        .catch(function (error) {
          console.error("brougth requisition");
        });
    }
    getBrought();
  }, [user.user.id]);

  return { brougth };
}
