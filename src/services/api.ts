import { getItem } from "@/utils/Localstorage";
import axios from "axios";
import { parseCookies } from "nookies";

const baseApi = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_API_URL : "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});



// baseApi.interceptors.request.use(
//   (config) => {
//     let token = null;

//     if (typeof window !== "undefined") {
//       token = getItem("token");
//     }

//     if (!token) {
//       const cookies = parseCookies();
//       console.log(cookies)
//       token = cookies.token;
//     }

//     if (token && config.headers) {
//       config.headers.Authorization = `${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );


baseApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const endpoints = {
    login:"/auth/login",
    signup:"/auth/sign-up",
    lookup:"/auth/lookup",
    google:"/auth/google",
}

export default baseApi;
