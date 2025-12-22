import axios from 'axios';


export const axiosClient = axios.create({
    baseURL: "http://localhost:7778",
    timeout: 3000,
    withCredentials: true 
});



 