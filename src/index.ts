import 'module-alias/register'
import express from "express";
import routes from "./route/index";
import mysql from "mysql";
import startApp from "./app";

/**
 *
 * 1.趋势周期 1.短期 2.长期 （根据15m 1h 4h 1d）
 * 2.趋势类型 1.上升 2.下跌 3.震荡
 * 3.币种
 */

const cors = require("cors");

export const app = express();
app.use(cors()).use(express.json());

// 路由
for (const item of routes) {
  item.route && app.use(item.path, item.route);
}

export const backstage = mysql.createPool({
  host: "47.109.33.28", //数据库地址
  port: 3306,
  user: "wallet_server", //账号
  password: "njh52000", //密码
  database: "wallet_server",
});

app.use((err:any, req:any, res:any, next:any) => {
  console.log("我的err" + err.message);
  next();
});
process.on('uncaughtException',(err)=>{
  // 
})

backstage.on("connection", () => {});
backstage.on("error", () => {});
app.listen(2000, () => {
  console.log("服务启动成功！server: http://localhost:2000");
  try {
    startApp();
  } catch (error) {
    console.log(error);
    
    startApp();
  }
});
