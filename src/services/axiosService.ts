import axios from "axios";
import * as dotenv from "dotenv";
import { accessToken, removeStorage } from "./auth";
import { history } from '../store/configureStore'


dotenv.config();

const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_DEV_API_URL || 'http://localhost:3000',
  ...axios.defaults.headers,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*"
  }
});

axiosInstance.interceptors.request.use(function(config) {
  // config.headers.Authorization =  'Bearer ' + (process.env.REACT_APP_DEV_API_ACCESS_TOKEN || '');
  config.headers.Authorization = "Bearer " + (accessToken() || "");

  return config;
});

axiosInstance.interceptors.response.use(function (response) {
  
  return response
}, function (error) {

  if (error.response.data.metaData && error.response.data.metaData.statusCode == 401) {
    removeStorage();
    history.push('/login', {
      'message': 'Terjadi Kesalahan Autentikasi, Silahkan Login Ulang'
    });

    return;
  }

  return Promise.reject(error)
})

export default axiosInstance;
