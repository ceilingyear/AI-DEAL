import OpenAI from "openai";
import { post } from ".";

// 会话模型
export function getChat(data:OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming) {
  return post<OpenAI.Chat.Completions.ChatCompletion>('/chat/completions',data)  
}
// // 助理
// export function createAssistant(data:any) {
//   return post<any>('/assistants',data)  
// }