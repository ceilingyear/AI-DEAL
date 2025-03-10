
import { createNewsMsg, createTraderAssistMsg, createTraderMsg } from "@/app/Ai";
import { bitgetConfig } from "@/setting";
import { accountTData, KLineTData, orderPendingTData, orderTData } from "@/utils/data";
import { log } from "../../log";
import OpenAI from "openai";
import fs from "fs";
import { srcPath } from "..";
import { accountToAI, KLineToAI, orderPendingToAI, orderToAI } from "./bitget/get";
import toTrade from "./bitget/set";
import { getContext } from "@/utils";

export const BITGET_BASE_CONFIG = {
  "symbol": "BTCUSDT",
}

export default async function startApp() {
  try {
    const symbolData = {
      kData:{
        "4H": await KLineToAI({granularity:"4H",...BITGET_BASE_CONFIG}),
        "1D": await KLineToAI({granularity:"1D",...BITGET_BASE_CONFIG}),
        "1W": await KLineToAI({granularity:"1W",...BITGET_BASE_CONFIG}),
        "1M": await KLineToAI({granularity:"1M",...BITGET_BASE_CONFIG}),
      },
      order:await orderToAI(),
      account:await accountToAI(),
      pending:await orderPendingToAI()
    }
    const news = await createNewsMsg(`分析一下关于${BITGET_BASE_CONFIG.symbol}的新闻`) 
    const assist = createTraderAssistMsg(JSON.stringify({
      "K线数据": symbolData.kData,
    }))
    const aiRes = await createTraderMsg(JSON.stringify({
      "交易对": BITGET_BASE_CONFIG.symbol,
      "当前仓位数据": symbolData.order,
      "当前挂单数据": symbolData.pending,
      "当前账户": symbolData.account,
      "k线数据": symbolData.kData,
      "新闻": news,
      "趋势分析": assist,
    }))
    await toTrade(aiRes)
  } catch (error) {
    console.log(error);
    
    // startApp()
    log(JSON.stringify({
      "错误": error
    }))
  }
}