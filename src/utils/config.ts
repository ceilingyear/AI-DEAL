import BigNumber from "bignumber.js";
import fs from "fs";
import OpenAI from "openai";
import { srcPath } from "..";
import { IsInTime } from "./data";


export function getModel():DeepSeekModel {
  const isIn = IsInTime({h:0,m:30},{h:8,m:30})
  if (isIn) {
    return 'deepseek-reasoner'
  }
  return 'deepseek-chat'
}

export function getContext() {
  const file = fs.readFileSync(srcPath + '/app/Ai/context.txt', 'utf-8')
  let context: (OpenAI.Chat.Completions.ChatCompletionMessageParam & { timestamp: number })[] = !file ? [] : JSON.parse(file)
  return context
}