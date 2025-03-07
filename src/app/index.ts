import { closeOrder, getAccount, getKlineFutures, getOrders, orderPending, setAverage, toOrder } from "@/api/bitget/futures";
import { createTraderMsg } from "@/api/openAi";
import { bitgetConfig } from "@/setting";
import { accountTData, KLineTData, orderPendingTData, orderTData } from "@/utils/data";
import { log } from "../../log";
import OpenAI from "openai";
import fs from "fs";
import { srcPath } from "..";
const K = {
  "symbol": "BTCUSDT",
  "granularity": "4H",
}

export default async function startApp() {
  try {
    let now = Date.now()
    console.log(now);

    const [k, myOrder, myAccount, myPending] = await Promise.all([getKlineFutures({ ...K, startTime: (now - 1000 * 60 * 60 * 24 * 10).toString(), endTime: now.toString() }), getOrders(), getAccount(), orderPending()])
    const symbolData:any = {
      kData:[],
      order:[],
      account:[],
      pending:[]
    }
    if (k?.data) {
      symbolData.kData = k?.data.map(item => (KLineTData(item)))
    }
    if (myOrder?.data) {
      symbolData.order = myOrder?.data.map(item => (orderTData(item)))
    }
    if (myAccount?.data) {
      symbolData.account = myAccount?.data.map(item => (accountTData(item)))
    }
    if (myPending?.data.entrustedList) {
      symbolData.pending = myPending?.data.entrustedList.map(item => (orderPendingTData(item)))
    }
    log(JSON.stringify({
      "交易对": K.symbol,
      "当前仓位数据": symbolData.order,
      "当前账户": symbolData.account,
      "当前挂单数据": symbolData.pending,
    }));
    const file = fs.readFileSync(srcPath + '/api/openAi/context.txt', 'utf-8')
    let context: (OpenAI.Chat.Completions.ChatCompletionMessageParam & { timestamp: number })[] = !file ? [] : JSON.parse(file)
    const aiRes = await createTraderMsg(JSON.stringify({
      "交易对": K.symbol,
      "周期": K.granularity,
      "当前仓位数据": symbolData.order,
      "当前挂单数据": symbolData.pending,
      "当前账户": symbolData.account,
      "k线数据": symbolData.kData
    }), context)
    if (!aiRes) return
    context.push({ role: 'assistant', content: aiRes, timestamp: Date.now() })
    const AIResponse: AIRes[] = JSON.parse(aiRes)
    for (const item of AIResponse) {
      if (item.leverage) {
        await setAverage(item.leverage)
      }
      if (item.deal) {
        toOrder(item.deal)
      }
      if (item.close) {
        closeOrder(item.close)
      }
    }
    fs.writeFileSync(__dirname + '/context.txt', JSON.stringify(context))
  } catch (error) {
    console.log(error);

    log(JSON.stringify({
      "错误": error
    }))
  }
}