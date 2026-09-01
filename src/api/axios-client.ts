import axios, { AxiosError, type AxiosResponse } from "axios";

export const axiosClient = axios.create({
  baseURL: "http://localhost:7778",
  timeout: 10000,
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  (config) => {
    console.log("🔵 REQUEST SLANJA:", {
      method: config.method,
      url: config.url,
      baseURL: config.baseURL,
      fullURL: `${config.baseURL}${config.url}`,
      data: config.data,
      params: config.params,
    });
    return config;
  },
  (error) => {
    console.log("🔴 REQUEST ERROR:", error);
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // console.log("Response catched!", response);
    // if(response.data != undefined) return response.data.Data
    return response;
  },
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }
    console.log("Response error catched!", error);
    return Promise.reject(error);
  },
);
