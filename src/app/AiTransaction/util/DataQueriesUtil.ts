import { getBitgetKline_spots } from "@/api/bitget/spots";

// 数据查询
export class DataQueriesUtil {
  // 查询现货数据
  static async getSpot(data: {
    symbol: string;
    period: KLineSpotPeriod;
    after?: string;
    before?: string;
    limit: string;
  }) {
    const res2 = await getBitgetKline_spots(data);
    return JSON.stringify(
      res2.data.map(item => ({
        开盘价: item.open,
        收盘价: item.close,
        最高价: item.high,
        最低价: item.low,
        交易币成交量: item.baseVol,
        计价币成交量: item.quoteVol,
        usdt成交量: item.usdtVol,
      }))
    );
  }
}
