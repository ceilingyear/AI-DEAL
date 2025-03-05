import { getBitgetKline_spots, getBitgetProducts } from "../../api/bitget/spots";
import bestBuySpot from "./bestBuySpot";
import bestBuyPoint from "./bestBuyPoint";
import { backstage } from "../..";
import { clearTable } from "../../utils/sql";

export type BestBuySpotReturnType = ReturnType<typeof bestBuySpot>;

export interface SettingType {
  symbol: string[]; //查询某个交易对
  period: KLineSpotPeriod; //k线周期
  after?: string; //在某天之后
  before?: string; //在某天之前
  limit: string; //查询条数 默认100，最大1000
  HighLowRatio: number; //高低位判断比例,百分比
}

const setting: SettingType = {
  symbol: [], //"LOOKSUSDT_SPBL", "ALPHAUSDT_SPBL", "KP3RUSDT_SPBL", "PEPE2USDT_SPBL"
  period: "1Dutc",
  after: undefined,
  before: undefined,
  limit: "200",
  HighLowRatio: 0.7,
};
const resultSpot: BestBuySpotReturnType[] = [];
let listTime: any = null;

// 发现可以符合购买条件的现货
export default async function start(beforeIndex?: number) {
  let index = beforeIndex || 0;
  try {
    const res = await getBitgetProducts();
    let acpSymbol = res.data;
    if (setting.symbol.length > 0) {
      acpSymbol = acpSymbol.filter(item => setting.symbol.includes(item.symbol));
    }

    if (!listTime) {
      let isWaiting = false; //是否请求中
      //清空表格
      // backstage.query(clearTable('low_spot'),(err,result)=>{
      listTime = setInterval(async () => {
        if (isWaiting) return;
        const element = acpSymbol[index];
        isWaiting = true;
        // 获取所有k线数据
        let data: GetBitgetKline_spotsRes[] = [];
        let before;
        while (true) {
          try {
            const res2 = await getBitgetKline_spots({
              symbol: element.symbol,
              period: setting.period,
              after: setting.after && "" + +new Date(setting.after),
              before: before,
              limit: setting.limit,
            });
            data = [...res2.data, ...data];
            if (res2.data.length !== +setting.limit) {
              break;
            }
            before = res2.data[0].ts;
          } catch (error) {
            clearInterval(listTime);
            listTime = null;
            setTimeout(() => {
              start(index);
            }, 1000 * 60);
          }
        }

        let symbolHigh = 0; //最高点
        let symbolLow = 0; //最低点
        for (const item of data) {
          const close = +item.close;
          if (symbolHigh < close) symbolHigh = close;
          if (symbolLow > close || symbolLow === 0) symbolLow = close;
        }
        isWaiting = false;
        //条件一
        const spot = bestBuySpot(data, element, setting, { symbolHigh, symbolLow });
        // 条件二，选择买点
        // const buy = bestBuyPoint(data.slice(data.length - 5, data.length), spot, element);
        if (spot) {
          resultSpot.push(spot);
          backstage.query("insert into low_spot set ?", spot);
          console.log(resultSpot);
        }
        console.log(`完成进度：${(((index + 1) / acpSymbol.length) * 100).toFixed(2)}%`);
        // 结束
        if (acpSymbol.length - 1 === index) {
          clearInterval(listTime);
          listTime = null;
          return console.log(resultSpot);
        }
        index++;
      }, 1000);
      // });
    }
  } catch (e) {
    clearInterval(listTime);
    listTime = null;
    setTimeout(() => {
      start(index);
    }, 1000 * 60);
  }
}
