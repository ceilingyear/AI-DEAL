import { accountAsset, getBitgetKline_spots, getBitgetProducts } from "@/api/bitget/spots";
import { SettingType } from "../getSpotBuy";
import dayjs from "dayjs";
import {bitget} from 'ccxt';

let initPrice = 100 //初始资金
let day = 30 //定投天数

export default async function(){
  // const today = dayjs().date()
  const bitgetApi = new bitget()
  const setting: SettingType = {
    symbol: ['BTCUSDT_SPBL'], 
    period: "1h",
    after: undefined,
    before: undefined,
    limit: "24",
    HighLowRatio: 0,
  };
  const res = await getBitgetProducts();
  
  let acpSymbol = res.data;
  if (setting.symbol.length > 0) {
    acpSymbol = acpSymbol.filter(item => setting.symbol.includes(item.symbol));
  }
  for (const element of acpSymbol) {
    accountAsset({coin:element.symbol}).catch(e=>{
    console.log(e);
    
   })
   
  }
}