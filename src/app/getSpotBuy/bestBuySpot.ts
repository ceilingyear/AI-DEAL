import BigNumber from "bignumber.js";
import { average, getAmplitude } from "../../utils";
import type { SettingType } from "./index";
/**
 * 获取最佳建仓位
 * 条件一：1.价格在历史低位；2.最近10日15日均线在[震荡因子]以内；3.是否突破180日均线；4.价格在低位[180md];5.至少上交易所180天
 * @param data 数据源
 * @param element 当前币种信息
 * @param setting 配置信息
 * @param param3 最高点和=最低点
 * @returns
 */
export default function (
  data: GetBitgetKline_spotsRes[],
  element: GetBitgetProductsRes,
  setting: SettingType,
  { symbolLow, symbolHigh }: { symbolLow: number; symbolHigh: number }
) {
  if (!data || data.length < 180 || +data[data.length - 2].usdtVol <= 10 * 10000 ) return null;
  let index = 0;
  const isLow = []; //价格是否在低位
  const isHigh = []; //价格是否在低位
  const isInAmplitude = []; //是否是[震荡因子]以内
  const data15 = data.slice(data.length - 15);
  const closeList15 = data15.map(item => new BigNumber(item.close));
  const avg30_1 = average(
    data.map(item => new BigNumber(item.close)),
    30,
    +element.priceScale,
    data.length - 1
  ); //获取30日均线
  const avgList15_1 = average(
    data.map(item => new BigNumber(item.close)),
    15,
    +element.priceScale
  ).slice(data.length - 15); //获取15日均线
  const avg180_1 = average(
    data.map(item => new BigNumber(item.close)),
    180,
    +element.priceScale,
    data.length - 1
  ); //获取最后一位180日均线
  const amplitude_1 = +getAmplitude(data15); //震荡因子

  for (const item of data15) {
    const close = +item.close;
    if (close <= 0) continue;
    // 低点概率
    if (close <= (symbolHigh- symbolLow) * (1 - setting.HighLowRatio) && close >= symbolLow) {
      isLow.push(true);
    } else {
      isLow.push(false);
    }
    // 高点概率
    if (close >= symbolHigh * setting.HighLowRatio) {
      isHigh.push(true);
    } else {
      isHigh.push(false);
    }
    // 判断是否在震荡因子之内
    const this15Avg = +avgList15_1[index];
    if (close >= this15Avg * (1 - amplitude_1) && close <= this15Avg * (1 + amplitude_1)) {
      isInAmplitude.push(true);
    } else {
      isInAmplitude.push(false);
    }
    
    index++;
  }

  const lastDay = +closeList15[closeList15.length - 1];

  const lowRatio = isLow.filter(item => item).length / isLow.length;
  const highRatio = isHigh.filter(item => item).length / isHigh.length;
  const isInAmplitudeRatio = isInAmplitude.filter(item => item).length / isInAmplitude.length;
  const totalRes = {
    symbol: element.symbol,
    lowRatio,
    highRatio,
    isInAmplitudeRatio,
    isGoing30:lastDay >= +avg30_1,  // 判断是否突破30md
    isGoing180:lastDay >= +avg180_1,  // 判断是否突破180md
    isLow: lastDay <= symbolLow,
    isHigh: lastDay >= symbolHigh,
    usdtVol: +data15[data15.length - 2].usdtVol || 0,
  };

  // if (
  //   totalRes.highRatio < 0.8 &&
  //   totalRes.lowRatio > 0.8 &&
  //   totalRes.usdtVol > 10 * 10000 &&
  //   isInAmplitudeRatio > .6
  // ) {
    return totalRes;
  // }
}
