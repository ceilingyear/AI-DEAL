import { getKlineFutures, order } from "@/api/bitget/futures";
import { createTraderMsg } from "@/api/openAi";

export default async function startApp() {
  try {
    const res = await getKlineFutures({ symbol: "SBTCSUSDT_SUMCBL", granularity: "1H", startTime: (Date.now() - 1000 * 60 * 60 * 24 * 5).toString(), endTime: Date.now().toString() })
    console.log(res);
    
    if (!res) return
    const kData = res.map(item => ({ "时间戳": item[0], "开盘价": item[1], "最高价": item[2], "最低价": item[3], "收盘价": item[4], "交易币成交量": item[5], "计价币成交量": item[6] }))
    const aiRes = await createTraderMsg("交易对：SBTCSUSDT_SUMCBL"+JSON.stringify(kData))
    if (!aiRes) return
    const params:AIRes = JSON.parse(aiRes)
    if (params.deal) {
     const orderRes = await order(params.deal)
     console.log(orderRes);
     
    }
  } catch (error) {
    console.log(error);

  }

}