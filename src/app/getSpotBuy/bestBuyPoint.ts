import BigNumber from "bignumber.js";
import { BestBuySpotReturnType } from ".";
import { average, getAmplitude } from "../../utils";

const option = {
  buyRate:.3
}
//处理三种情况：1.平稳震荡；2.v字型；3.单边行情 
export default function (
  data: GetBitgetKline_spotsRes[],
  params: BestBuySpotReturnType,
  element: GetBitgetProductsRes
) {
  let symbolHigh = 0; //最高点
  let symbolLow = 0; //最低点
  const amplitude = getAmplitude(data)
  const averageList = average(data.map(item => new BigNumber(item.close)),5,+element.priceScale)
  for (const item of data) {
    const close = +item.close;
    const open = +item.open;
    if (symbolHigh < close) symbolHigh = close;
    if (symbolHigh < open) symbolHigh = open;
    if (symbolLow > close || symbolLow === 0) symbolLow = close;
    if (symbolLow > open || symbolLow === 0) symbolLow = open;
  }
}
