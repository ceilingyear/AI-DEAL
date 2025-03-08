
import { createTraderMsg } from "@/app/openAi";
import { bitgetConfig } from "@/setting";
import { accountTData, KLineTData, orderPendingTData, orderTData } from "@/utils/data";
import { log } from "../../log";
import OpenAI from "openai";
import fs from "fs";
import { srcPath } from "..";
import { accountToAI, BITGET_BASE_CONFIG, KLineToAI, orderPendingToAI, orderToAI } from "./bitget/get";
import toTrade from "./bitget/set";
import { getContext } from "@/utils";


export default async function startApp() {
  try {
    const symbolData = {
      kData:await KLineToAI(),
      order:await orderToAI(),
      account:await accountToAI(),
      pending:await orderPendingToAI()
    }
    log(JSON.stringify({
      "交易对": BITGET_BASE_CONFIG.symbol,
      "当前仓位数据":symbolData.order,
      "当前账户": symbolData.account,
      "当前挂单数据": symbolData.pending,
    }));
    
    const aiRes = await createTraderMsg(JSON.stringify({
      "交易对": BITGET_BASE_CONFIG.symbol,
      "周期": BITGET_BASE_CONFIG.granularity,
      "当前仓位数据": symbolData.order,
      "当前挂单数据": symbolData.pending,
      "当前账户": symbolData.account,
      "k线数据": symbolData.kData
    }))
    await toTrade(aiRes)
  } catch (error) {
    // startApp()
    log(JSON.stringify({
      "错误": error
    }))
  }
}