import { getContext } from "@/utils";
import { cancelOrder, closeOrder, getAccount, getKlineFutures, getOrders, orderPending, setAverage, toOrder } from "@/api/bitget/futures";
import fs from 'fs'

// 去交易相关
export default async function toTrade(aiRes: string | null,) {
  try {
    if (!aiRes) return Promise.reject('aiRes is undefined')
    const context = getContext()
    context.push({ role: 'assistant', content: aiRes, timestamp: Date.now() })
    const AIResponse: AIRes[] = JSON.parse(aiRes)
    console.log(AIResponse);

    for (const item of AIResponse) {
      if (item.cancelOrder) {
        await cancelOrder(item.cancelOrder)
      }
      if (item.leverage) {
        await setAverage(item.leverage)
      }
      if (item.deal) {
        await toOrder(item.deal)
      }
      if (item.close) {
        await closeOrder(item.close)
      }
    }
    fs.writeFileSync(__dirname + '/openAi/context.txt', JSON.stringify(context))
  } catch (error) {
    throw new Error(''+error)
  }
}