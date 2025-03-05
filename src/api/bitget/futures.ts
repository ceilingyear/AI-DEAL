import { bitgetConfig } from "@/setting";
import { get, post } from ".";
const crypto = require('crypto-js');

function header({ method, requestPath, queryString, body }: { method: 'GET' | 'POST', requestPath: string, queryString?: string, body?: string }) {
  const str = Date.now() + method + requestPath + (queryString ? queryString : '') + (body ? body : '')
  console.log(str);
  
  const hmac = crypto.HmacSHA256(str, bitgetConfig.SECRETKEY);
  const sign = crypto.enc.Base64.stringify(hmac)

  return {
    // "Content-Type": "application/json",
    'ACCESS-KEY': bitgetConfig.APIKEY,
    'ACCESS-SIGN': sign,
    'ACCESS-TIMESTAMP': Date.now().toString(),
    'ACCESS-PASSPHRASE': bitgetConfig.PASSPHRASE,
    locale: 'zh-CN',

  }
}

// 获取合约历史k线
export function getKlineFutures(data: GetKLine_futures) {
  return get<string[][]>("/api/v2/mix/market/candles", { ...data, productType: 'susdt-futures' }, {
    headers: header({ method: 'GET', requestPath: '/api/v2/mix/market/candles', queryString: `?symbol=${data.symbol}&granularity=${data.granularity}&startTime=${data.startTime}&endTime=${data.endTime}&kLineType?=${data.kLineType}&limit?=${data.limit}&productType=susdt-futures` }),
  });
}

// 下单
export function order(data: Deal) {
  return post<RequestType<FeatureCoin[]>>("/api/v2/mix/order/place-order", { ...data, productType: 'susdt-futures'  }, {
    headers: header({ method: 'POST', requestPath: '/api/v2/mix/order/place-order', body: JSON.stringify({ ...data, productType: 'susdt-futures' }) }),
  });
}
