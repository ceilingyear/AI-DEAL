import express from "express";
import { backstage } from "../..";
import { getBitgetKline_futures } from "@/api/bitget/futures";

const route = express.Router()

export const getFeat = route.get('/',(req,res)=>{
  getBitgetKline_futures({
    ...req.query as any
  }).then(res2=>{
    console.log(res2);
    
    res.send(res2)
  }).catch(err=>{
    console.log(err);
    res.status(400).send(err)
  })
}) 