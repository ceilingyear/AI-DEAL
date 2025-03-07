import { bitgetConfig } from "@/setting";
import { get, post } from ".";
import { API_CONFIG, BIZ_CONSTANT, encrypt, encryptRSA } from "@/utils/encrypt";

const productType = 'USDT-FUTURES'
const marginCoin = 'USDT'

function header({ method, requestPath, data }: { method: 'GET' | 'POST', requestPath: string, data: { [key: string]: any } }) {
  const timestamp = Date.now();
  let signString = encrypt(method, requestPath, data, timestamp, bitgetConfig.SECRETKEY);
  if (API_CONFIG.SIGN_TYPE === BIZ_CONSTANT.RSA) {
    signString = encryptRSA(method, requestPath, data, timestamp, bitgetConfig.SECRETKEY)
  }

  return {
    "Content-Type": "application/json",
    'ACCESS-KEY': bitgetConfig.APIKEY,
    'ACCESS-SIGN': signString,
    'ACCESS-TIMESTAMP':timestamp,
    'ACCESS-PASSPHRASE': bitgetConfig.PASSPHRASE,
    locale: 'zh-CN',
    // paptrading: "1"
  }
}


// 获取合约历史k线
export function getKlineFutures(data: GetKLine_futures) {
  return get<RequestType<string[][]>>("/api/v2/mix/market/candles", { ...data, productType });
}

// 下单
export function toOrder(data: Deal) {
  return post<RequestType<FeatureCoin[]>>("/api/v2/mix/order/place-order", { ...data, productType }, {
    headers: header({ method: 'POST', requestPath: '/api/v2/mix/order/place-order', data: { ...data, productType } }),
  });
}
// 获取全部合约仓位信息
export function getOrders() {
  const data = { productType,}
  return get<RequestType<MyOrders[]>>("/api/v2/mix/position/all-position", data, {
    headers: header({ method: 'GET', requestPath: '/api/v2/mix/position/all-position', data }),
  });
}
// 获取账户信息列表
export function getAccount() {
  const data = { productType }
  return get<RequestType<Account[]>>("/api/v2/mix/account/accounts", data, {
    headers: header({ method: 'GET', requestPath: '/api/v2/mix/account/accounts', data }),
  });
}
// 调整杠杆倍数
export function setAverage(data: SetAverage) {
  return post<RequestType<any>>("/api/v2/mix/account/set-leverage", { productType, marginCoin, ...data }, {
    headers: header({ method: 'POST', requestPath: '/api/v2/mix/account/set-leverage', data: { productType, marginCoin, ...data } }),
  });
}
// 一键市价平仓
export function closeOrder(data: CloseOrder) {
  return post<RequestType<any>>("/api/v2/mix/order/close-positions", { productType, ...data }, {
    headers: header({ method: 'POST', requestPath: '/api/v2/mix/order/close-positions', data: { productType, ...data } }),
  });
}
// 当前委托
export function orderPending() {
  return get<RequestType<{entrustedList:OrderPending[]}>>("/api/v2/mix/order/orders-pending", {productType}, {
    headers: header({ method: 'GET', requestPath: '/api/v2/mix/order/orders-pending', data: {productType} }),
  });
}
// 取消委托
export function cancelOrder(data:CancelOrder) {
  return post<RequestType<any>>("/api/v2/mix/order/cancel-order", {productType,...data}, {
    headers: header({ method: 'POST', requestPath: '/api/v2/mix/order/cancel-order', data: {productType, ...data} }),
  });
}
