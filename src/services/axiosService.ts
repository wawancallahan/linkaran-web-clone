import axios from 'axios';
import * as dotenv from 'dotenv';
import { accessToken } from './auth'

dotenv.config();

const axiosInstance = axios.create({
    // baseURL: process.env.REACT_APP_DEV_API_URL || 'http://localhost:3000',
    ...axios.defaults.headers,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':'*',
    },
});

axiosInstance.interceptors.request.use(function (config) {
    config.headers.Authorization =  'Bearer ' + (process.env.REACT_APP_DEV_API_ACCESS_TOKEN || '');
    // config.headers.Authorization =  'Bearer ' + ( accessToken || '' );

    return config;
});


export default axiosInstance;