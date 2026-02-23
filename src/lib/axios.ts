import axios from "axios";

export const axiosApi = axios.create({
  baseURL: process.env.BETTER_AUTH_URL,
  timeout: 10000,
});
