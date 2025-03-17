
import { createTraderAssistMsg, createTraderMsg } from "@/app/Ai";
import { log } from "../../log";
import { accountToAI, contractsToAI, KLineToAI, orderPendingToAI, orderToAI } from "./bitget/get";
import toTrade from "./bitget/set";
import { AItoNews } from "./news";

export const BITGET_BASE_CONFIG = {
  "symbol": "BTCUSDT",
}

export default async function startApp() {
  try {
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
    if (symbolData.account && h1 && +symbolData.account[0].总可用 < +h1[h1?.length -1].收盘价 *.8) {
      return log('余额不足最新价的80%，停止继续请求\n'+JSON.stringify({...symbolData,"kData":"隐藏"}))
    }
    const assist = await createTraderAssistMsg(JSON.stringify({
      "K线数据": symbolData.kData,
    }))
    const news = await AItoNews()
    const inData = {
      "当前数据交易对": BITGET_BASE_CONFIG.symbol,
      "当前仓位数据": symbolData.order,
      "当前挂单数据": symbolData.pending,
      "当前账户": symbolData.account,
      "k线数据": symbolData.kData,
      "合约信息": symbolData.contract,
      "团队":{
        "最近热门新闻查询结果": news,
        "趋势分析员的分析结果": assist,
      }
    }
    log("输入数据：\n"+JSON.stringify({...inData,"k线数据":"隐藏","团队":"隐藏"}))
    const aiRes = await createTraderMsg(JSON.stringify(inData))
    console.log(aiRes);
    await toTrade(aiRes)
  } catch (error) {
    console.log(error);
    
    setTimeout(() => {
      startApp()
    }, 1000 * 60 * 10);
    log(JSON.stringify({
      "错误": error
    }))
  }
}