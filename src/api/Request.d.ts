type KLineSpotPeriod = '1min' | '5min' | '15min' | '30min' | '1h' | '4h' | '6h' | '12h' | '1day' | '3day' | '1week' | '1M' | '1Dutc' | '3Dutc' | '1Wutc' //K线的时间单位,粒度（取值参考如下列表)

interface GetKLine_futures {
  symbol: string;
  granularity: string;
  startTime: string;
  endTime: string;
  kLineType?: string;
  limit?: string;
}
interface GetKLine_spots {
  symbol: string;
  period: KLineSpotPeriod;
  after?: string; //ms,返回大于等于本时间之后的
  before?: string; //ms,返回小于等于本时间之前的
  limit?: string; //查询条数 默认100，最大1000
}
