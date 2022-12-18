const last1 = require("../../../../assets/img/stream.png");
const last2 = require("../../../../assets/img/planos.png");
const last3 = require("../../../../assets/img/adobe.png");
const last4 = require("../../../../assets/img/antivirus.png");
const last5 = require("../../../../assets/img/software.png");
const last6 = require("../../../../assets/img/VPN.png");
const height = Math.floor(Math.random() * 100 + 150);

export const Touchables = [
  {
    title: "Todos",
    key: 0,
  },

  {
    title: "Depoimento",
    key: 1,
  },
  {
    title: "Narração",
    key: 2,
  },
  {
    title: "Edição de foto",
    key: 3,
  },
  {
    title: "Videos",
    key: 4,
  },
  {
    title: "Arte para post",
    key: 5,
  },
];
export const Last = [
  {
    source: last1,
    key1: "lastkey1",
    key2: "lastkey2",
    height: 200,
    name: "Netflix",
    price: 15.99,
    places: 4,
  },
  {
    source: last2,
    key1: "last2key1",
    key2: "last2key2",
    height: 150,
    name: "Xbox",
    price: 15.99,
    places: 1,
  },
  {
    source: last3,
    key1: "last3key1",
    key2: "last3key2",
    height: 150,
    name: "Photoshop",
    price: 15.99,
    places: 1,
  },
  {
    source: last4,
    key1: "last4key1",
    key2: "last4key2",
    height: 200,
    name: "Karspersky",
    price: 15.99,
    places: 1,
  },
  {
    source: last5,
    key1: "last5key1",
    key2: "last5key2",
    height: 200,
    name: "Office ",
    price: 15.99,
    places: 1,
  },
  {
    source: last6,
    key1: "last6key1",
    key2: "last6key2",
    height: "40%",
    name: "Nord vpn",
    price: 15.99,
    places: 1,
  },
];
