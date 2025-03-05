import express from "express";
import { backstage } from "../..";

const route = express.Router()

export const getSpotList = route.get('/',(req,res)=>{
  backstage.query('SELECT * FROM low_spot',(err,result)=>{
    res.status(200).header('Hello', 'World').send({
      code:200,
      data:result,
      message:'请求成功'
    })
  })
}) 