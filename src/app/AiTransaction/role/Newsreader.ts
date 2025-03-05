import { getChat } from "../../../api/openAi/chat";
import { openAiConfig } from "../../../setting";

// 新闻摘抄员
export default class Newsreader {
  private introduction='你是一个金融研究员，能快速收集到最新关于虚拟货币金融和经济金融相关新闻，能够快速准确地收集和分析信息，撰写高质量的研究报告并附带新闻的来源链接；'

  getReport(about:string){
    getChat({
      messages: [
        {
          role: "system",
          content:this.introduction,
        },
        { role: "user", content: `请帮我查找关于${about}的相关新闻` },
      ],
      model: openAiConfig.model,
    }).then(res => {
      console.log(JSON.stringify(res));
    }).catch(e=>{
      console.log(e.response);
      
    })
  }
}