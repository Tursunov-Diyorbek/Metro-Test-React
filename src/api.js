import axios from "axios";


export const api = axios.create({
  baseURL: "https://testprojectformetro-production-ad66.up.railway.app/",
  timeout: 30 * 1000,
  headers: {
    "Content-Type": "application/json",
  },
});
