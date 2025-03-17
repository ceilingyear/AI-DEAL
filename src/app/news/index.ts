import { newsApi } from "@/setting";
import { createNewsMsg } from "../Ai"
import NewsAPI from "newsapi";
import { BITGET_BASE_CONFIG } from "..";
import { log } from "../../../log";

export async function AItoNews() {
  try {
    const newsReq = new NewsAPI(newsApi);
    const newsRes: NewsRes = await newsReq.v2.topHeadlines({
      q: BITGET_BASE_CONFIG.symbol,
      sortBy: "popularity",
      pageSize: "50"
    })
    const news = newsRes.articles.map(i => ({
      "来源": i.source,
      "作者": i.author,
      "标题": i.title,
      "描述": i.description,
      "内容": i.content,
      "url": i.url,
      "发布于": i.publishedAt,
    }))
    if (news.length === 0) {
      return Promise.resolve("未查询到相关新闻")
    }
    log("新闻查询数据：\n"+JSON.stringify(news))
    return Promise.resolve(news)
  } catch (error) {
    return Promise.reject(error)
  }

}