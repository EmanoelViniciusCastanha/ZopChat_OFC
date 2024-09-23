import axios from "axios";

export const webFetch = axios.create({
  baseURL: "http://localhost:5433",
  headers: {
    "Content-Type": "application/json",
  },
});
