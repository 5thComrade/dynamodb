import axios, { type AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: "/",
});

interface ConfigObj {
  method: string;
  url: string;
  requestConfig: Partial<AxiosRequestConfig>;
}

export class AxiosService {
  async requestWithAxios(configObj: ConfigObj) {
    const { method, url, requestConfig = {} } = configObj;

    try {
      const response = await axiosInstance.request({
        url,
        method: method.toLowerCase(),
        ...requestConfig,
      });

      return response;
    } catch (err) {
      console.log("axios service error: ", err);
      throw err;
    }
  }
}
