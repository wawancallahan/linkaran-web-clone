import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const axiosInstance = axios.create({
    // baseURL: process.env.REACT_APP_DEV_API_URL || 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':'*',
    },
});

axiosInstance.interceptors.request.use(function (config) {
    config.headers.Authorization =  'Bearer ' + (localStorage.getItem('accessToken') || '');

    return config;
});


export default axiosInstance;