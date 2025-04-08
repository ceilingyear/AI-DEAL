import { bitgetConfig } from "@/setting";
import axios, { AxiosRequestConfig } from "axios";
const https = require('https');

const agent = new https.Agent({
  rejectUnauthorized: false  // 可选：忽略证书验证（仅测试环境）
});

const bitgetAxios = axios.create({
  baseURL: 'https://api.bitget.com',
  // proxy: {
  //   host: '127.0.0.1',
  //   port: 7897,  // 与 Clash 的 HTTP 代理端口一致（默认 7890）
  //   protocol: 'http'
  // },
  // httpsAgent:agent
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
