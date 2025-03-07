
// 处理账户信息
export function KLineTData(item: string[]) {
  return { "时间戳": item[0], "开盘价": item[1], "最高价": item[2], "最低价": item[3], "收盘价": item[4], "交易币成交量": item[5], "计价币成交量": item[6] }
}
// 处理账户信息
export function accountTData(item: Account) {
  return { "保证金币种": item.marginCoin, "全仓最大可用来开仓余额(保证金币种)": item.crossedMaxAvailable, "逐仓最大可用来开仓余额(保证金币种)": item.isolatedMaxAvailable,"仓位可用(基础币)": item.available, "锁定数量(保证金币种)": item.locked, "账户权益(保证金币种)，包含未实现盈亏（根据mark price计算）": item.accountEquity, "折算USDT账户权益": item.usdtEquity,  "全仓时风险率": item.crossedRiskRate, "联合保证金": item.unionTotalMargin, "未实现盈亏": item.unrealizedPL, "总可用": item.unionAvailable, "维持保证金": item.unionMm, "联合保证金币种数据": item.assetList, "逐仓占用保证金": item.isolatedMargin, "全仓占用保证金": item.crossedMargin, "全仓未实现盈亏": item.crossedUnrealizedPL, "逐仓未实现盈亏": item.isolatedUnrealizedPL,  }
}
// 处理当前持仓信息
export function orderTData(item: MyOrders) {
  return { "币对名称": item.symbol, "保证金币种": item.marginCoin, "持仓方向": item.holdSide, "当前委托待成交的数量(基础币)": item.openDelegateSize, "保证金数量 (保证金币种)": item.marginSize, "仓位可用(基础币)": item.available, "仓位冻结(基础币)": item.locked,  "杠杆倍数": item.leverage, "已实现盈亏（不包含资金费用和手续费）": item.achievedProfits, "平均开仓价": item.openPriceAvg, "保证金模式": item.marginMode, "持仓模式": item.posMode, "未实现盈亏": item.unrealizedPL, "预估强平价": item.liquidationPrice, "仓位档位维持保证金率": item.keepMarginRate, "标记价格": item.markPrice, "仓位盈亏平衡价": item.breakEvenPrice,  "止盈价格": item.takeProfit, "止损价格": item.stopLoss, "止盈订单ID": item.takeProfitId, "止损订单ID": item.stopLossId,  "维持保证金率（0.1代表10%）": item.marginRatio, "创建时间": item.cTime, "最近更新时间": item.uTime }
}
// 处理当前持仓信息
export function orderPendingTData(item: OrderPending) {
  return { "币对名称": item.symbol, "保证金币种": item.marginCoin, "订单id": item.orderId, "当前委托待成交的数量(自定义订单id)": item.clientOid, "订单状态live: 未成交；partially_filled：部分成交": item.status, "委托数量": item.size, "交易币成交数量": item.baseVolume,  "杠杆倍数": item.leverage, "手续费": item.fee, "委托价格": item.price, "保证金模式": item.marginMode, "持仓模式": item.posMode, "平均成交价格": item.priceAvg, "开单方向buy 买，sell 卖": item.side, "持仓方向": item.posSide, "计价币成交数量": item.quoteVolume, "String	交易方向": item.tradeSide,  "是否只减仓": item.reduceOnly, "预设止盈值": item.presetStopSurplusPrice, "订单类型": item.orderType, "预设止盈执行价格": item.presetStopSurplusExecutePrice,  "预设止损值": item.presetStopLossPrice, "创建时间": item.cTime, "最近更新时间": item.uTime,"预设止损执行价格":item.presetStopLossExecutePrice }
}