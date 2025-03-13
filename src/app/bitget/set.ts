import { getContext } from "@/utils";
import { cancelOrder, closeOrder, getAccount, getKlineFutures, getOrders, orderPending, setAverage, toOrder } from "@/api/bitget/futures";
import fs from 'fs'
import { srcPath } from "@/index";

// 去交易相关
export default async function toTrade(aiRes: string | null,) {
  try {
    if (!aiRes) return Promise.reject('aiRes is undefined')
    let context = getContext()
    context.push({ role: 'user', content: "请给我相关投资建议", timestamp: Date.now() })
    context.push({ role: 'assistant', content: aiRes, timestamp: Date.now() })
    if (context.length > 5) {
      context = context.slice(context.length - 6,context.length)
    }
    const AIResponse: AIRes[] = JSON.parse(aiRes)

    for (const item of AIResponse) {
      if (item.cancelOrder) {
        const res = await cancelOrder(item.cancelOrder)
        if (res.code != '00000') Promise.reject(res)
      }
      if (item.leverage) {
        const res = await setAverage(item.leverage)
        if (res.code != '00000') Promise.reject(res)
      }
      if (item.deal) {
        const res = await toOrder(item.deal)
        if (res.code != '00000') Promise.reject(res)
      }
      if (item.close) {
        const res = await closeOrder(item.close)
        if (res.code != '00000') Promise.reject(res)
      }
    }
    
    fs.writeFileSync(srcPath + '/app/Ai/context.txt', JSON.stringify(context))
  } catch (error) {
    return Promise.reject(error)
  }
}