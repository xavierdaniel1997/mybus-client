import axios from 'axios';

// const API_URL = process.env.SERVER_ORIGIN
// console.log("base url form the api instance", API_URL)

export  const api = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true,
})

