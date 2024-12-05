import axios, {AxiosResponse} from 'axios';

const https = require('https');

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
})

api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const data = localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN || "token");
        if (data) {
            const dataParsed = JSON.parse(data);
            config.headers.Authorization = `Token ${dataParsed["key"]}`;
        }
    }

    config.timeout = 30000;

    return config;
})

api.interceptors.response.use((response: AxiosResponse) => {
    return response;
}, (error) => {
    console.log(error)
    return Promise.reject(error);
})

export default api;
