interface RequestType<T>{
  code: string,
  msg: string,
  requestTime: number,
  data:T
}

interface GetBitgetKline_spotsRes {
  open: string;
  high: string;
  low: string;
  close: string;
  quoteVol: string;
  baseVol: string;
  usdtVol: string;
  ts: string;
}

interface GetBitgetProductsRes {
  symbol: string;
  symbolName: string;
  baseCoin: string;
  quoteCoin: string;
  minTradeAmount: string;
  maxTradeAmount: string;
  takerFeeRate: string;
  makerFeeRate: string;
  priceScale: string;
  quantityScale: string;
  quotePrecision: string;
  status: string;
  minTradeUSDT: string;
  buyLimitPriceRatio: string;
  sellLimitPriceRatio: string;
}

interface FeatureCoin {
  baseCoin: string;
  baseCoinDisplayName: string;
  buyLimitPriceRatio: string;
  feeRateUpRatio: string;
  makerFeeRate: string;
  minTradeNum: string;
  openCostUpRatio: string;
  priceEndStep: string;
  pricePlace: string;
  quoteCoin: string;
  quoteCoinDisplayName: string;
  sellLimitPriceRatio: string;
  sizeMultiplier: string;
  supportMarginCoins: string[];
  symbol: string;
  symbolDisplayName: string;
  takerFeeRate: string;
  volumePlace: string;
  symbolType: string;
  symbolStatus: string;
  offTime: string;
  limitOpenTime: string;
}