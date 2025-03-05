import { bitgetConfig } from "@/setting";
import { get, post } from ".";
const crypto = require('crypto-js');

function header({ method, requestPath, queryString, body }: { method: 'GET' | 'POST', requestPath: string, queryString?: string, body?: string }) {
  const str = Date.now() + method + requestPath + (queryString ? queryString : '') + (body ? body : '')
  const hmac = crypto.HmacSHA256(str, bitgetConfig.SECRETKEY);
  const sign = crypto.enc.Base64.stringify(hmac)

  return {
    "Content-Type": "application/json",
    'ACCESS-KEY': bitgetConfig.APIKEY,
    'ACCESS-SIGN': sign,
    'ACCESS-TIMESTAMP':Date.now(),
    'ACCESS-PASSPHRASE': bitgetConfig.PASSPHRASE,
    locale: 'zh-CN',
    paptrading:1,
  }
}

// 获取合约历史k线
export function getKlineFutures(data: GetKLine_futures) {
  return get<string[][]>("/api/mix/v1/market/candles", { ...data, productType: 'sumcbl' }, {
    headers: header({ method: 'GET', requestPath: '/api/mix/v1/market/candles', queryString: `?symbol=${data.symbol}&granularity=${data.granularity}&startTime=${data.startTime}&endTime=${data.endTime}&kLineType=${data.kLineType}&limit=${data.limit}&productType=sumcbl` }),
  }); 
}

// 下单
export function order(data: Deal) {
  return post<RequestType<FeatureCoin[]>>("/api/v2/mix/order/place-order", { ...data, productType: 'susdt-futures'  }, {
    headers: header({ method: 'POST', requestPath: '/api/v2/mix/order/place-order', body: JSON.stringify({ ...data, productType: 'susdt-futures' }) }),
  });
}
