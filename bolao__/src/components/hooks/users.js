import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
export function UserApi(url) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const options = {
      method: "GET",
      url: url,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setUser(response.data);
      })

      .finally(() => {
        setLoading(false);
      })

      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return { user };
}
