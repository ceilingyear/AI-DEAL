import BigNumber from "bignumber.js";
import fs from "fs";
import OpenAI from "openai";
/**
 * 计算平均值,均线
 * @param data  数据源
 * @param length  计算平均值长度
 * @param fixed  精度
 * @param index 计算某个值的结果
 * @returns string[]|string 返回多个或者单个结果
 */
export function average(data: BigNumber[], length: number, fixed: number, index?: number) {
  if (index) {
    // 获取某个数据平均值
    const newData = data.slice(index - length > 0 ? index - length : 0, index)
    const result = newData.reduce((a, b, index) => {
      if (newData.length - 1 === index) {
        return b.plus(a).dividedBy(newData.length)
      }
      return b.plus(a)
    }, new BigNumber(0)).toFixed(fixed)
    return result
  }
  const dataArr = []
  let dataIndex = 0
  for (const item of data) {
    // 获取某个数据平均值
    const newData = data.slice(dataIndex - length + 1 > 0 ? dataIndex - length + 1 : 0, dataIndex + 1)
    const result = newData.reduce((a, b, index) => {
      if (newData.length - 1 === index) {
        return b.plus(a).dividedBy(newData.length)
      }
      return b.plus(a)
    }, new BigNumber(0)).toFixed(fixed)
    dataArr.push(result)
    dataIndex++
  }
  return dataArr
}


/**
 * 获取振幅或者震荡因子
 * @param data {open: 开盘, close: 收盘, }[],传入一个值代表查询单个振幅
 * @returns number
 */
export function getAmplitude(data: GetBitgetKline_spotsRes[]): number {
  let result = 0
  for (const item of data) {
    const open = +item.open
    const close = +item.close
    result += Math.abs(open - close) / open
  }
  return result / data.length
}

export function getContext() {
  const file = fs.readFileSync(__dirname + '/openAi/context.txt', 'utf-8')
  let context: (OpenAI.Chat.Completions.ChatCompletionMessageParam & { timestamp: number })[] = !file ? [] : JSON.parse(file)
  return context
}