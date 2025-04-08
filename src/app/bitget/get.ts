import { contracts, depth, getAccounts, getKlineFutures, getOrders, orderPending } from "@/api/bitget/futures"
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
  const res = await getAccounts()
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
// 合约信息
export async function contractsToAI(data:{symbol:string}) {
  const res = await contracts(data)
  if (res?.data && res.data.length > 0) {
    const item =res?.data[0] 
    return Promise.resolve({
      "最小USDT交易额": item.minTradeUSDT,
      "最小杠杆": item.minLever,
      "最大杠杆": item.maxLever,
      "数量小数位": item.volumePlace,
      "价格小数位": item.pricePlace,
      "买价限价比例": item.buyLimitPriceRatio,
      "卖价限价比例": item.sellLimitPriceRatio,
      "最小开单数量(基础币)": item.minTradeNum,
    } )
  }
}
// 合并深度接口
export async function depthToAI(data:{symbol:string}) {
  const res = await depth(data)
  const resData = res.data 
  if (resData) {
    return Promise.resolve({
      '当前价位的所有卖单如["38084.5","0.5"] 中，"38084.5"代表深度价格，"0.5"代表基础币数量': resData.asks,
      '当前价位的所有买单如["38084.5","0.5"] 中，"38084.5"代表深度价格，"0.5"代表基础币数量': resData.bids,
      "当前档位，例：scale 1": resData.precision,
      "实际的精度值，例：0.1": resData.scale,
      "YES 表示当前已经是最大精度，NO 非最大精度": resData.isMaxPrecision,
      "当前深度对应的时间 Unix时间戳的毫秒数格式，如 1597026383085": resData.ts,
    } )
  }
}