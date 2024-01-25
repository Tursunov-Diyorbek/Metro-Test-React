import axios from "axios";


export const api = axios.create({
  baseURL: "http://testprojectformetro-production.up.railway.app/",
  timeout: 30 * 1000,
  headers: {
    "Content-Type": "application/json",
  },
});
