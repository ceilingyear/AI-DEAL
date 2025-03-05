import { bitgetConfig } from "@/setting";
import axios, { AxiosRequestConfig } from "axios";

const bitgetAxios = axios.create({
  baseURL: 'https://api.bitget.com',
})

export function post<K>(url: string, data?: any, option?: AxiosRequestConfig<any>) {
  return new Promise<K>((resolve, reject) => {
    bitgetAxios<K>({
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
    bitgetAxios<K>({
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
