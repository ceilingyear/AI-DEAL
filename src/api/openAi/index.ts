import axios, { AxiosRequestConfig } from "axios";
import { openAiConfig } from "../../setting";

const openAiAxios = axios.create({
  baseURL: "https://openkey.cloud/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${openAiConfig.key}`
  },
})

export function post<K>(url: string, data?: any, option?: AxiosRequestConfig<any>) {
  return new Promise<K>((resolve, reject) => {
    openAiAxios<K>({
      url,
      method: "post",
      data,
      ...option
    })
      .then(res => {
        if (res.status == 200) {
          resolve(res.data);
        } else {
          reject(res);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function get<K>(url: string, params?: any, option?: AxiosRequestConfig<any>) {
  return new Promise<K>((resolve, reject) => {
    openAiAxios<K>({
      url,
      method: "get",
      params,
      ...option
    })
      .then(res => {
        if (res.status == 200) {
          resolve(res.data);
        } else {
          reject(res);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}
