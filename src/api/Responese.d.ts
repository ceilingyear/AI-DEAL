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

interface MyOrders {
  marginCoin: string;
  symbol: string;
  holdSide: string;
  openDelegateSize: string;
  marginSize: string;
  available: string;
  locked: string;
  total: string;
  leverage: string;
  achievedProfits: string;
  openPriceAvg: string;
  marginMode: string;
  posMode: string;
  unrealizedPL: string;
  liquidationPrice: string;
  keepMarginRate: string;
  markPrice: string;
  marginRatio: string;
  breakEvenPrice: string;
  totalFee: string;
  deductedFee: string;
  grant: string;
  assetMode: string;
  autoMargin: string;
  takeProfit: string;
  stopLoss: string;
  takeProfitId: string;
  stopLossId: string;
  cTime: string;
  uTime: string;
}

interface Account {
  marginCoin: string;
  locked: string;
  available: string;
  crossedMaxAvailable: string;
  isolatedMaxAvailable: string;
  maxTransferOut: string;
  accountEquity: string;
  usdtEquity: string;
  btcEquity: string;
  crossedRiskRate: string;
  unrealizedPL: string;
  coupon: string;
  unionTotalMagin: string;
  unionAvailable: string;
  unionTotalMargin: string;
  unionMm: string;
  assetList: AssetList[];
  isolatedMargin: string;
  crossedMargin: string;
  crossedUnrealizedPL: string;
  isolatedUnrealizedPL: string;
  assetMode: string;
}

interface AssetList {
  coin: string;
  balance: string;
}

interface OrderPending {
  symbol: string;
  size: string;
  orderId: string;
  clientOid: string;
  baseVolume: string;
  fee: string;
  price: string;
  priceAvg: string;
  status: string;
  side: string;
  force: string;
  totalProfits: string;
  posSide: string;
  marginCoin: string;
  quoteVolume: string;
  leverage: string;
  marginMode: string;
  enterPointSource: string;
  tradeSide: string;
  posMode: string;
  orderType: string;
  orderSource: string;
  presetStopSurplusPrice: string;
  presetStopSurplusExecutePrice: string;
  presetStopSurplusTriggerType: string;
  presetStopLossPrice: string;
  presetStopLossExecutePrice: string;
  presetStopLossTriggerType: string;
  reduceOnly: string;
  cTime: string;
  uTime: string;
}

interface NewsRes {
  status: string;
  totalResults: number;
  articles: Article[];
}

interface Article {
  source: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface Source {
  id: string;
  name: string;
}