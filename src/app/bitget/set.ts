import { getContext } from "@/utils/config";
import { cancelOrder, closeOrder, getAccount, getKlineFutures, getOrders, orderPending, setAverage, toOrder } from "@/api/bitget/futures";
import fs from 'fs'
import { srcPath } from "@/index";
import { URL2ITEM, URL2ITEMKEY } from "./enums";

// 去交易相关
export default async function toTrade(aiRes: string | null, reTryUrl?: URL2ITEMKEY) {
  try {

    if (!aiRes) return Promise.reject('aiRes is undefined')
    let AIResponse: AIRes[] = JSON.parse(aiRes)
    // 如果有reTryUrl，说明是重试，直接重试
    // if (reTryUrl) {
    //   const key = URL2ITEM[reTryUrl]
    //   const item = AIResponse.find(item => item[key])
    //   if (key === 'cancelOrder' && item?.cancelOrder) {
    //     const res = await cancelOrder(item.cancelOrder)
    //   }
    //   if (key === 'leverage' && item?.leverage) {
    //     const res = await setAverage(item.leverage)
    //     if (res.code != '00000') Promise.reject(res)
    //   }
    //   if (key === 'deal' && item?.deal) {
    //     const res = await toOrder(item.deal)
    //     if (res.code != '00000') Promise.reject(res)
    //   }
    //   if (key === 'close' && item?.close) {
    //     const res = await closeOrder(item.close)
    //     if (res.code != '00000') Promise.reject(res)
    //   }
    //   return
    // }
    // let context = getContext()
    // context.push({ role: 'user', content: "请给我相关投资建议", timestamp: Date.now() })
    // context.push({ role: 'assistant', content: aiRes, timestamp: Date.now() })
    // if (context.length > 5) {
    //   context = context.slice(context.length - 6, context.length)
    // }
    AIResponse = AIResponse.sort(i => i.leverage ? -1 : 1)
    for (const item of AIResponse) {
      if (item?.cancelOrder) {
        const res = await cancelOrder(item.cancelOrder)
        if (res.code != '00000') Promise.reject(res)
      }
      if (item?.leverage) {
        const res = await setAverage(item.leverage)
        if (res.code != '00000') Promise.reject(res)
      }
      if (item?.deal) {
        const res = await toOrder(item.deal)
        if (res.code != '00000') Promise.reject(res)
      }
      if (item?.close) {
        const res = await closeOrder(item.close)
        if (res.code != '00000') Promise.reject(res)
      }
    }

    // fs.writeFileSync(srcPath + '/app/Ai/context.txt', JSON.stringify(context))
  } catch (error: any) {
    console.log('交易失败', error?.message);
    // 重新执行错误的命令
    // if (error?.message && error?.message.includes("Request failed with status code 400")) {
    //   setTimeout(() => {
    //     toTrade(aiRes, error?.config?.url)
    //   }, 1 * 60 * 1000);
    // }
    return Promise.reject(error)
  }
}
