import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
export function onProducts() {
  const [products, setProducts] = useState();

  useEffect(() => {
    function getJogos() {
      const options = {
        method: "GET",
        url: "https://rutherles.site/api/jogos",
        headers: { "Content-Type": "application/json" },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          setProducts(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    }

    getJogos();
  }, []);

  return { products };
}
