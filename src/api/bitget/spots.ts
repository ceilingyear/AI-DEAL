import { get } from ".";
const crypto = require('crypto-js');
import { bitgetConfig } from "@/setting";
const NodeRSA = require('node-rsa')


function header({method,requestPath,queryString,body}:{method:'GET' | 'POST',requestPath:string,queryString?:string,body?:string}) {
  const str = Date.now()+method+requestPath+(queryString ? queryString : '')+(body? body : '')
  const hmac = crypto.HmacSHA256(str, bitgetConfig.SECRETKEY);
  const sign = crypto.enc.Base64.stringify(hmac)
  console.log(sign,str);
  
 return {
    'ACCESS-KEY':bitgetConfig.APIKEY,
    'ACCESS-SIGN':sign,
    'ACCESS-TIMESTAMP':Date.now().toString(),
    'ACCESS-PASSPHRASE':bitgetConfig.PASSPHRASE,
    locale: 'zh-CN'
  }
}

// 获取现货历史k线
export function getBitgetKline_spots(data: GetKLine_spots) {
  return get<RequestType<GetBitgetKline_spotsRes[]>>("/api/spot/v1/market/candles", data);
}
// 获取现货交易对
export function getBitgetProducts() {
  return get<RequestType<GetBitgetProductsRes[]>>("/api/spot/v1/public/products");
}
// 获取现货资产
export function accountAsset(data:{coin?:string}) {
  return get<RequestType<GetBitgetProductsRes[]>>("/api/spot/v1/account/assets",data,{headers:header({method:'GET',requestPath:'/api/spot/v1/account/assets',})});
}
