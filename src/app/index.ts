
import { createNewsMsg, createTraderAssistMsg, createTraderMsg } from "@/app/Ai";
import { bitgetConfig } from "@/setting";
import { accountTData, KLineTData, orderPendingTData, orderTData } from "@/utils/data";
import { log } from "../../log";
import OpenAI from "openai";
import fs from "fs";
import { srcPath } from "..";
import { accountToAI, contractsToAI, KLineToAI, orderPendingToAI, orderToAI } from "./bitget/get";
import toTrade from "./bitget/set";
import { getContext } from "@/utils";
import { contracts } from "@/api/bitget/futures";

export const BITGET_BASE_CONFIG = {
  "symbol": "BGBUSDT",
}

export default async function startApp() {
  try {
    const h4 =  await KLineToAI({granularity:"4H",...BITGET_BASE_CONFIG})
    const h1 = await KLineToAI({granularity:"1H",...BITGET_BASE_CONFIG})
    const w1 = await KLineToAI({granularity:"1W",...BITGET_BASE_CONFIG})
    const m1 = await KLineToAI({granularity:"1M",...BITGET_BASE_CONFIG})
    const symbolData = {
      kData:{
        "4H数据":h4,
        "1D数据":h1,
        "1W数据": w1?.slice(w1.length - 52, w1.length),
        "1M数据": m1?.slice(m1.length - 36, m1.length),
      },
      order:await orderToAI(),
      account:await accountToAI(),
      pending:await orderPendingToAI(),
      contract:await contractsToAI({...BITGET_BASE_CONFIG})
    }
    // const news = await createNewsMsg(`帮我查询一下今日关于${BITGET_BASE_CONFIG.symbol}的新闻并分析一下`) 
    const assist = await createTraderAssistMsg(JSON.stringify({
      "K线数据": symbolData.kData,
    }))
    const inData = {
      "当前数据交易对": BITGET_BASE_CONFIG.symbol,
      "当前仓位数据": symbolData.order,
      "当前挂单数据": symbolData.pending,
      "当前账户": symbolData.account,
      "k线数据": symbolData.kData,
      "合约信息": symbolData.contract,
      "团队":{
        // "新闻分析员的分析结果": news,
        "趋势分析员的分析结果": assist,
      }
    }
    log("输入数据：\n"+JSON.stringify({...inData,"k线数据":"隐藏","团队":"隐藏"}))
    const aiRes = await createTraderMsg(JSON.stringify(inData))
    console.log(aiRes);
    
    await toTrade(aiRes)
  } catch (error) {
    console.log(error);
    
    // startApp()
    log(JSON.stringify({
      "错误": error
    }))
  }
}