import { getAccount, getKlineFutures, getOrders, orderPending } from "@/api/bitget/futures"
import { accountTData, KLineTData, orderPendingTData, orderTData } from "@/utils/data"
export const BITGET_BASE_CONFIG = {
  "symbol": "BTCUSDT",
  "granularity": "4H",
}
// k线信息
export async function KLineToAI() {
  let now = Date.now()
  const res = await getKlineFutures({ ...BITGET_BASE_CONFIG, startTime: (now - 1000 * 60 * 60 * 24 * 10).toString(), endTime: now.toString() })
  if (res?.data) {
    return Promise.resolve(res?.data.map(item => (KLineTData(item))))
  }
  return Promise.reject('k线获取失败')
}
// 订单信息
export async function orderToAI() {
  const res = await getOrders()
  if (res?.data) {
    return Promise.resolve( res?.data.map(item => (orderTData(item))))
  }
  return Promise.reject('订单信息获取失败')
}
// 账户信息
export async function accountToAI() {
  const res = await getAccount()
  if (res?.data) {
    return Promise.resolve( res?.data.map(item => (accountTData(item))))
  }
  return Promise.reject('账户信息获取失败')
}
// 挂单信息
export async function orderPendingToAI() {
  const res = await orderPending()
  if (res?.data) {
    return Promise.resolve( res?.data.entrustedList.map(item => (orderPendingTData(item))))
  }
  return Promise.reject('挂单信息获取失败')
}