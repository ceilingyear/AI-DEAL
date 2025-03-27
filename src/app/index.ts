
import { createTraderAssistMsg, createTraderMsg } from "@/app/Ai";
import { log } from "../../log";
import { accountToAI, contractsToAI, KLineToAI, orderPendingToAI, orderToAI } from "./bitget/get";
import toTrade from "./bitget/set";
import { AItoNews } from "./news";

export const BITGET_BASE_CONFIG = {
  "symbol": "BTCUSDT",
}
let doing = false
let timeout:any

export default async function startApp() {
  try {
    if (doing) return
    doing = true
    const h1 = await KLineToAI({granularity:"1H",...BITGET_BASE_CONFIG})
    const h4 =  await KLineToAI({granularity:"4H",...BITGET_BASE_CONFIG})
    const d1 =  await KLineToAI({granularity:"1D",...BITGET_BASE_CONFIG})
    // const w1 = await KLineToAI({granularity:"1W",...BITGET_BASE_CONFIG,limit:'10'})
    // const m1 = await KLineToAI({granularity:"1M",...BITGET_BASE_CONFIG,limit:'1'})
    const symbolData = {
      kData:{
        "1H数据":h1,
        "4H数据":h4,
        "1D数据":d1,
        // "1W数据": w1,
        // "1M数据": m1,
      },
      order:await orderToAI(),
      account:await accountToAI(),
      pending:await orderPendingToAI(),
      contract:await contractsToAI({...BITGET_BASE_CONFIG})
    }
    if (symbolData.account && symbolData.order && +symbolData.account[0].总可用 < 2 && symbolData.order?.length > 0) {
      doing = false
      return log('余额不足2U，停止继续请求\n'+JSON.stringify({...symbolData,"kData":"隐藏"}))
    }
    const assist = await createTraderAssistMsg(JSON.stringify({
      "K线数据": symbolData.kData,
    }))
    // const news = await AItoNews()
    const inData = {
      "当前数据交易对": BITGET_BASE_CONFIG.symbol,
      "当前仓位数据": symbolData.order,
      "当前挂单数据": symbolData.pending,
      "当前账户": symbolData.account,
      "k线数据": symbolData.kData,
      "合约信息": symbolData.contract,
      "团队":{
        // "最近热门新闻查询结果": news,
        "趋势分析员的分析结果": assist,
      }
    }
    log("输入数据：\n"+JSON.stringify({...inData,"k线数据":"隐藏","团队":"隐藏"}))
    const aiRes = await createTraderMsg(JSON.stringify(inData))
    await toTrade(aiRes)
    doing = false
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      startApp()
    },  1000 * 60 * 60 * 6);
  } catch (error:any) {
    console.log(error?.message);
    doing = false
    if (error?.message && error?.message.includes("Unexpected end of JSON input")) {
      setTimeout(() => {
        startApp()
      }, 1000 * 60 * 5);
    }
    log(JSON.stringify({
      "错误": error
    }))
  }
}