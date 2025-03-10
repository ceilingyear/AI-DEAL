import { getAccount, getKlineFutures, getOrders, orderPending } from "@/api/bitget/futures"
import { accountTData, KLineTData, orderPendingTData, orderTData } from "@/utils/data"

// k线信息
export async function KLineToAI(data:GetKLine_futures) {
  const res = await getKlineFutures(data)
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