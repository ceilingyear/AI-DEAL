import { deepSeekConfig } from '@/setting';
import { log } from '../../../log';
import { loading } from '@/utils/process';
import fs from 'fs';
import OpenAI from 'openai';
import { NewsPrompt, TraderAssistPrompt, TraderPrompt } from './prompt';
import { tools } from './fnCall';
import { getContext } from '@/utils';

const deepseek = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: deepSeekConfig?.key,
});

const completion = deepseek.chat.completions

let load: ReturnType<typeof loading>

// 交易员
export async function createTraderMsg(msg: string) {
  try {
    load = loading()
    const context = getContext()    
    const newMsg = await completion.create({
      messages: [TraderPrompt, ...context, { role: 'user', content: msg }], model: deepSeekConfig.model, temperature: 0.3,
    })
    load.stop()
    log("AI交易数据：\n" + newMsg.choices[0].message)
    return Promise.resolve(newMsg.choices[0].message.content)
  } catch (error) {
    load.stop("推理失败")
    return Promise.reject(error)
  }
}
// 新闻分析员
export async function createNewsMsg(msg: string) {
  try {
    load = loading("新闻分析中")
    const newMsg = await completion.create({
      messages: [NewsPrompt, { role: 'user', content: msg }], model: 'deepseek-chat', temperature: 0.3,
    })
    load.stop("新闻分析完成")
    log('AI新闻分析：\n'+newMsg.choices[0].message.content)
    return Promise.resolve(newMsg.choices[0].message.content)
  } catch (error) {
    load.stop("新闻分析失败")
    return Promise.reject(error)
  }
}
// 行情趋势分析员
export async function createTraderAssistMsg(msg: string) {
  try {
    load = loading("趋势分析中") 
    const newMsg = await completion.create({
      messages: [TraderAssistPrompt,{ role: 'user', content: msg }], model: deepSeekConfig.model, temperature: 0.3,
    })
    log('AI趋势分析：\n'+newMsg.choices[0].message)
    load.stop("趋势分析完成")
    return Promise.resolve(newMsg.choices[0].message.content)
  } catch (error) {
    load.stop("趋势分析失败")
    return Promise.reject(error)
  }
}