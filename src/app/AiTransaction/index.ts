// Please install OpenAI SDK first: `npm install openai`

import { deepSeekConfig, } from "@/setting";
import OpenAI from "openai";

const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: deepSeekConfig.key
});

export async function main() {
  const messageA:any = [{ role: "user", content: "你好" }]
  const messageB = []
  for(;;){
    const completionB = await openai.chat.completions.create({
      messages: messageA,
      model: deepSeekConfig.model,
    });
    const res = JSON.parse(JSON.stringify(completionB.choices[0].message))
    messageA.push(JSON.parse(JSON.stringify(res)))
    res.role = 'user'
    messageB.push(JSON.parse(JSON.stringify(res)))
    const completionA = await openai.chat.completions.create({
      messages: messageB,
      model: deepSeekConfig.model,
    });
    const res2 = JSON.parse(JSON.stringify(completionA.choices[0].message))
    messageB.push(JSON.parse(JSON.stringify(res2)))
    res2.role = 'user'
    messageA.push(JSON.parse(JSON.stringify(res2)))
    console.log(messageA);
    console.log(messageB)
  }
}
