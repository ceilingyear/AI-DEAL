import { deepSeekConfig } from '@/setting';
import { log } from '../../../log';
import { loading } from '@/utils/process';
import fs from 'fs';
import OpenAI from 'openai';
import { TraderPrompt } from './prompt';
import { tools } from './fnCall';

const deepseek = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: deepSeekConfig?.key,
});

const completion = deepseek.chat.completions

let load: ReturnType<typeof loading>

export async function createTraderMsg(msg: string,context:(OpenAI.Chat.Completions.ChatCompletionMessageParam & {timestamp:number})[]=[]) {
  try {
    load = loading()
    const newMsg = await completion.create({
      messages: [TraderPrompt, ...context, { role: 'user', content: msg }], model: deepSeekConfig.model, temperature: 0.3,
    })
    load.stop()
    log(JSON.stringify({
      "输出": newMsg.choices[0].message,
    }))
    return Promise.resolve(newMsg.choices[0].message.content)
  } catch (error) {
    load.stop("推理失败")
    return Promise.reject(error)
  }
}