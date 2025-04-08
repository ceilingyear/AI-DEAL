import startApp from '@/app'
import { bitgetConfig } from '@/setting'
import { createHmac } from 'crypto'
import { log } from '../../../log'
import WebSocket from 'ws'

let lastPositionsLength = 0
export function createBitgetSocket() {
  const date = '' + Date.now()
  const mac = createHmac('sha256', bitgetConfig.SECRETKEY)
  const preHashToMacBuffer = mac.update(date + 'GET' + '/user/verify').digest()
  const ws = new WebSocket('wss://ws.bitget.com/v2/ws/private')
  ws.on('open', () => {
    ws.send(JSON.stringify({
      op: 'login',
      args: [
        {
          apiKey: bitgetConfig.APIKEY,
          passphrase: bitgetConfig.PASSPHRASE,
          timestamp: date,
          sign: preHashToMacBuffer.toString('base64')
        }
      ]
    }))
  })
  ws.on('message', (event) => {
    try {
      const res = JSON.parse(event.toString())
      // 登录成功
      if (res.event === 'login' && res.code == 0) {
        console.log("登录成功");
        ws.send(JSON.stringify({
          "op": "subscribe",
          "args": [
            {
              "instType": "USDT-FUTURES",
              "channel": "positions",
              "instId": "default"
            }
          ]
        }))
      }
      /**
       * 订阅仓位频道
       * 以下事件发生时将推送数据：
       * 下开、平仓委托、开、平仓委托成交、撤单
       */
      if (res?.arg?.channel === 'positions' && res?.data) {
        // 只有在之前有仓位但是后面没有仓位了，才重新启动
        if (res?.data?.length === 0 && lastPositionsLength !== 0) {
          console.log("已有仓位平仓，重启服务");
          startApp()
        }
        lastPositionsLength = res?.data?.length || 0
        console.log('当前仓位数量：'+lastPositionsLength);
        
      }
    }
    catch (error) {
      console.log();
      log('error:'+error+'res:'+event.toString())
    }
  })
  return ws
}