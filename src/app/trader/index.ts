import { getBitgetKline_futures, getFeatProducts } from "@/api/bitget/futures";

export default class Robot {
  /**
   * 时间戳	0
   * 开盘价	1
   * 最高价	2
   * 最低价	3
   * 收盘价，最新一个收盘价可能还在持续更新，请订阅websocket跟踪最新价	4
   * 交易币成交量	5
   * 计价币成交量 6
   */
  private h1List: string[][] = [];
  private h4List: string[][] = [];
  private d1List: string[][] = [];
  private coinList: FeatureCoin[] = [];
  private config = {
    symbol: ["SHIBUSDT"],
    h1Line: 15 * (24 / 1),
    h4Line: 15 * (24 / 4),
    d1Line: 15,
  };
  constructor() {
    // 获取k线数据
    getFeatProducts().then(async res => {
      try {
        this.coinList = res.data;
        if (this.config.symbol.length > 0) {
          this.coinList = res.data.filter(item =>
            this.config.symbol.includes(item.symbolDisplayName)
          );
        }
        for (const coin of this.coinList) {
          console.log(coin.symbol);
          
          getBitgetKline_futures({
            symbol: coin.symbol,
            granularity: "4H",
            limit: "" + this.config.h4Line,
            startTime: "0",
            endTime: Date.now().toString(),
          })
          // this.h1List = await getBitgetKline_futures({
          //   symbol: coin.symbol,
          //   granularity: "1H",
          //   limit: "" + this.config.h1Line,
          //   startTime: "0",
          //   endTime: Date.now().toString(),
          // });
          this.d1List = await getBitgetKline_futures({
            symbol: coin.symbol,
            granularity: "1D",
            limit: "" + this.config.d1Line,
            startTime: Date.now().toString(),
            endTime: Date.now().toString(),
          });
        }
        console.log(this.d1List);
        // this.getPressure();
      } catch (error) {
        console.log(error);
        
      }
    });
  }

  /**
   * 支撑位压力位：
   * 1.支撑位最近最低点的高位
   * 2.压力位，从近到远最近的最高点的低位
   */

  // 获取压力位
  getPressure() {
    const nowItem = this.h4List[this.h4List.length - 1];
    const useData = this.h4List.map(item=>([...item,(+item[1] - +item[4]) < 0]))
    const result: string[] = [];
    for (let index = this.h4List.length - 1 ; index >= 0; index--) {
      const thisItem = this.h4List[index];
      //是否是上涨
      // 都涨的情况
      // if (this.h4List[index-1][7] && this.h4List[index-2][7] && this.h4List[index-3][7]) {
        
      // }
      console.log(this.calculateAngles(+this.h4List[index-3][4] - +thisItem[4],0.0000003));
    }
    
  }
  // 是否在某个区间之内
  isInPercentageRange(referenceNumber: number,number?: number,  percentage = 0.005) {
    if (!number) return false
    const lowerLimit = referenceNumber * (1 - percentage );
    const upperLimit = referenceNumber * (1 + percentage);
    return number >= lowerLimit && number <= upperLimit;
  }
  calculateAngles(sideA:number, sideB:number) {
    const angle1 = Math.atan(sideA / sideB) * (180 / Math.PI);
    const angle2 = 90 - angle1;
    return { angle1, angle2 };
  }
}
