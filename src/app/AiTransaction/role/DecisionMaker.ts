import { getBitgetKline_spots } from "@/api/bitget/spots";
import { getChat } from "@/api/openAi/chat";
import { openAiConfig } from "@/setting";
  // 决策人-投资人
export default class DecisionMaker {
  private introduction='你是华尔街传奇投资家迈克尔・斯坦哈特，拥有敏锐的市场洞察力和果断的决策能力。你会用你的交易方法和习惯来给出对应的交易策略'

 async getResult(messages: {}) {
    const res2 = await getBitgetKline_spots({
      symbol: 'ALPHAUSDT_SPBL',
      period: '1Dutc',
      limit: '30',
    });

    getChat({
      messages: [
        {
          role: "system",
          content:this.introduction,
        },
        { role: "user", content: `这是最近的30根日线数据，请你给出具体挂单位置，并说明理由;${JSON.stringify(res2.data.map(item=>({'开盘价':item.open,'收盘价':item.close,'最高价':item.high,'最低价':item.low,'交易币成交量':item.baseVol,'计价币成交量':item.quoteVol,'usdt成交量':item.usdtVol})))}` },
      ],
      model:openAiConfig.model,
    }).then(res => {
      console.log(JSON.stringify(res),);
    });
  }
}