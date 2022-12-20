import axios from "axios";
const api = axios.create({
  baseURL: "https://rutherles.site/api/",
  timeout: 1000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
export default api;
