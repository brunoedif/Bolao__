import axios from "axios";
import { getLocalUser } from "./asyncStorage";
import React, { useEffect, useState } from "react";
export function getBuy() {
  const localId = getLocalUser();

  const buy = {
    method: "POST",
    url: "https://rutherles.site/api/compra",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      user_id: datas.user_id,
      valor: parseInt(datas.valor),
      imagem_small: datas.image,
      nome: datas.nome,
      dezenas: datas.dezenas,
      data: datas.data,
      concurso: datas.concurso,
      premiacao: datas.premiacao,
      jogo_id: datas.jogo_id,
    },
  };
  axios
    .request(buy)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error("can not buy");
    });

  const putQuotes = {
    method: "PUT",
    url: "https://rutherles.site/api/jogo/" + datas.jogo_id,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: { cota_total: datas.cotestotal },
  };

  axios
    .request(putQuotes)
    .then(function (response) {})
    .catch(function (error) {});

  const putWallet = {
    method: "PUT",
    url: "https://rutherles.site/api/usuario/" + localId,

    headers: { "Content-Type": "application/json" },
    data: { carteira: datas.wallet - datas.total },
  };

  axios
    .request(putWallet)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error("wallet");
    });

  const putMyBrought = {
    method: "POST",
    url: "https://rutherles.site/api/compras",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: { user_id: localId },
  };
  axios
    .request(putMyBrought)
    .then(function (response) {
      console.log(response.data);

      navigation.navigate("Profile");
      alert("Compra realizada com sucesso!");
    })
    .catch(function (error) {
      console.error(error);
    });
}
