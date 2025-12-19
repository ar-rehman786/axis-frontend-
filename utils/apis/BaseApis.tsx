import axios from "axios";

const api = axios.create({
  baseURL: "https://axis-trade-market-228971274466.europe-west1.run.app", 
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;