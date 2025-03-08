import { getAccount, getKlineFutures, getOrders, orderPending } from "@/api/bitget/futures"
import { accountTData, KLineTData, orderPendingTData, orderTData } from "@/utils/data"
export const BITGET_BASE_CONFIG = {
  "symbol": "BTCUSDT",
  "granularity": "1H",
}
// k线信息
export async function KLineToAI() {
  let now = Date.now()
  const res = await getKlineFutures({ ...BITGET_BASE_CONFIG, startTime: (now - 1000 * 60 * 60 * 24 * 10).toString(), endTime: now.toString() })
  if (res?.data) {
    return Promise.resolve(res?.data.map(item => (KLineTData(item))))
  }
}
// 订单信息
export async function orderToAI() {
  const res = await getOrders()
  if (res?.data) {
    return Promise.resolve( res?.data.map(item => (orderTData(item))))
  }
}
// 账户信息
export async function accountToAI() {
  const res = await getAccount()
  if (res?.data) {
    return Promise.resolve( res?.data.map(item => (accountTData(item))))
  }
}
// 挂单信息
export async function orderPendingToAI() {
  const res = await orderPending()
  if (res?.data && res.data.entrustedList) {
    return Promise.resolve( res?.data.entrustedList.map(item => (orderPendingTData(item))))
  }
}