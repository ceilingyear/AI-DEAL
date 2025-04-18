type KLineSpotPeriod = '1min' | '5min' | '15min' | '30min' | '1h' | '4h' | '6h' | '12h' | '1day' | '3day' | '1week' | '1M' | '1Dutc' | '3Dutc' | '1Wutc' //K线的时间单位,粒度（取值参考如下列表)

interface GetKLine_futures {
  symbol: string;
  granularity: string;
  startTime?: string;
  endTime?: string;
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

type Roles = 't' | 'n' | 'c' | 'd'
interface AIRes  {
  "from":Roles // 信息从谁传达出来，输入代号即可
  "to":Roles, // 需要将信息传达给谁，输入代号即可
  "message":string, //只有type === "member"时有效，代表你需要传达的信息
  "deal"?:Deal,
  leverage?:SetAverage, // 杠杆倍数
  close?:CloseOrder // 平仓
  cancelOrder?:CancelOrder, // 取消订单
  modifyOrder?:ModifyOrder, // 修改订单
}

interface Deal { 
  "symbol":string, // 交易对
  "side":"buy" | "sell", // 交易方向
  "marginMode":"isolated" | "crossed" // 仓位模式
  "marginCoin":string, // 保证金币种
  "size":string,//下单数量(基础币)
  "tradeSide"?:string,//交易类型(仅限双向持仓)双向持仓模式下必填，单向持仓时不要填，否则会报错
  "orderType":"limit" | "market", // 交易类型
  "price"?:string, // 下单价格(市价时不传)
  "presetTakeProfitPrice"?:string, // 预设止盈价格
  "presetStopLossPrice"?:string, // 预设止损价格 
}

interface SetAverage {
  symbol: string;
  leverage: string;
  holdSide: "long" | "short";
}

interface CloseOrder {
  symbol: string;
  holdSide: string;
}

interface CancelOrder {
  symbol: string;
  marginCoin?: string;
  orderId?:string;
  clientOid?:string;
}
interface ModifyOrder {
  symbol: string;
  marginCoin?: string;
  orderId?:string;
  clientOid?:string;
  newClientOid:string;
  newSize?:string;
  newPrice?:string;
  newPresetStopSurplusPrice?:string;
  newPresetStopLossPrice?:string;
}

interface ContractType {
  symbol: string;
  baseCoin: string;
  quoteCoin: string;
  buyLimitPriceRatio: string;
  sellLimitPriceRatio: string;
  feeRateUpRatio: string;
  makerFeeRate: string;
  takerFeeRate: string;
  openCostUpRatio: string;
  supportMarginCoins: string[];
  minTradeNum: string;
  priceEndStep: string;
  volumePlace: string;
  pricePlace: string;
  sizeMultiplier: string;
  symbolType: string;
  minTradeUSDT: string;
  maxSymbolOrderNum: string;
  maxProductOrderNum: string;
  maxPositionNum: string;
  symbolStatus: string;
  offTime: string;
  limitOpenTime: string;
  deliveryTime: string;
  deliveryStartTime: string;
  launchTime: string;
  fundInterval: string;
  minLever: string;
  maxLever: string;
  posLimit: string;
  maintainTime: string;
}