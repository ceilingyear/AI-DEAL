import 'module-alias/register'
import express from "express";
import routes from "./route/index";
import mysql from "mysql";
import startApp from "./app";
import { createBitgetSocket } from './api/bitget/socket';

const cors = require("cors");
export const srcPath = __dirname
export const app = express();
app.use(cors()).use(express.json());

// 路由
// for (const item of routes) {
//   item.route && app.use(item.path, item.route);
// }

app.use((err: any, req: any, res: any, next: any) => {
  console.log("我的err" + err.message);
  next();
});

process.on('uncaughtException', (err) => {
  // 
})

app.listen(2000, () => {
  console.log("服务启动成功！server: http://localhost:2000");
  createBitgetSocket()
  startApp();
  // 24小时重新登录
  setInterval(() => {
    createBitgetSocket()
  }, 1000 * 60 * 60 * 24);
  setInterval(() => {
    startApp();
  }, 1000 * 60 * 60 * 1);
});
