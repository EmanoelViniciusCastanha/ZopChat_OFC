import axios from "axios";

export const webFetch = axios.create({
  baseURL: "http://192.168.155.19:3002",
  headers: {
    "Content-Type": "application/json",
  },
});
