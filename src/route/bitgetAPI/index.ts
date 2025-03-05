
import express from "express";
import { backstage } from "../..";
import { getBitgetKline_futures } from "@/api/bitget/futures";

const route = express.Router()
// 获取合约
export const getFeat = route.get('/',(req,res)=>{
  getBitgetKline_futures({
    ...req.query as any
  }).then(res2=>{
    res.send(res2)
  }).catch(err=>{
    console.log(err);
    res.status(400).send(err)
  })
}) 
// 获取现货数据
export const getSpotList = route.get('/',(req,res)=>{
  backstage.query('SELECT * FROM low_spot',(err,result)=>{
    res.status(200).header('Hello', 'World').send({
      code:200,
      data:result,
      message:'请求成功'
    })
  })
}) 