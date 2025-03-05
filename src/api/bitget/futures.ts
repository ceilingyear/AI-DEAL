import { bitgetConfig } from "@/setting";
import { get } from ".";
const crypto = require('crypto-js');

function header({method,requestPath,queryString,body}:{method:'GET' | 'POST',requestPath:string,queryString?:string,body?:string}) {
  const str = Date.now()+method+requestPath+(queryString ? queryString : '')+(body? body : '')
  const hmac = crypto.HmacSHA256(str, bitgetConfig.SECRETKEY);
  const sign = crypto.enc.Base64.stringify(hmac)

 return {
    // "Content-Type": "application/json",
    'ACCESS-KEY':bitgetConfig.APIKEY,
    'ACCESS-SIGN':sign,
    'ACCESS-TIMESTAMP':Date.now().toString(),
    'ACCESS-PASSPHRASE':bitgetConfig.PASSPHRASE,
    locale: 'zh-CN'
  }
}

// 获取合约历史k线
export function getBitgetKline_futures(data: GetKLine_futures) {
  return get<string[][]>("/api/mix/v1/market/history-candles", data,{
    headers: header({method:'GET',requestPath:'/api/mix/v1/market/history-candles',queryString:`?symbol=${data.symbol}&granularity=${data.granularity}&startTime=${data.startTime}&endTime=${data.endTime}&kLineType?=${data.kLineType}&limit?=${data.limit}`}),
  });
}
// 获取合约交易对
export function getFeatProducts() {
  return get<RequestType<FeatureCoin[]>>("/api/mix/v1/market/contracts",{productType:'umcbl'},{
    headers: header({method:'GET',requestPath:'/api/mix/v1/market/contracts',queryString:'?productType=umcbl'}),
  });
}
