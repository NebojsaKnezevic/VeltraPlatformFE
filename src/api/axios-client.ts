import axios, { AxiosError, type AxiosResponse } from "axios";

export const axiosClient = axios.create({
  baseURL: "http://localhost:7778",
  timeout: 3000,
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log("Response catched!", response)
    // if(response.data != undefined) return response.data.Data
    return response;
  },
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
    }
     console.log("Response error catched!", error.response?.data)
    return Promise.reject(error);
  }
);
