import axios from "axios";

const isToken = JSON.parse(
  JSON.parse(localStorage.getItem("persist:root")).user
).currentUser;

const BASE_URL = "http://localhost:5000/api";
const TOKEN = isToken ? isToken.accessToken : "";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
