import axios from "axios";

export const webFetch = axios.create({
  baseURL: "localhost:3002",
  headers: {
    "Content-Type": "application/json",
  },
});
