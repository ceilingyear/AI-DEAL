import OpenAI from "openai";

export const tools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
  {
    "type": "function",
    "function": {
      "name": "deal",
      "description": "只有传达给时交易账户操作员(代号：d)有效，代表你需要下单的交易",
      "parameters": {
        "type": "object",
        "properties": {
          "symbol": {
            "type": "string",
            "description": "交易对"
          },
          "side": {
            "type": "string",
            "description": "交易方向",
            "enum": [
              "buy",
              "sell"
            ],
          },
          "marginMode": {
            "type": "string",
            "description": "仓位模式",
            "enum": [
              "isolated",
              "crossed"
            ],
          },
          "marginCoin": {
            "type": "string",
            "description": "保证金币种"
          },
          "size": {
            "type": "string",
            "description": "下单数量(基础币,必填数字类型);统一输出0.0001;"
          },
          "tradeSide": {
            "type": "string",
            "description": "交易类型,只能用于下单",
            "enum": [
              "open",
            ],
          },
          "orderType": {
            "type": "string",
            "description": "交易类型",
            "enum": [
              "limit",
              "market",
            ],
          },
          "price": {
            "type": "string",
            "description": "下单价格(市价时不传)",
          },
          "presetStopSurplusPrice": {
            "type": "string",
            "description": "预设止盈价格"
          },
          "presetStopLossPrice": {
            "type": "string",
            "description": "预设止损价格"
          }
        },
        "required": [
          "symbol",
          "side",
          "marginMode",
          "marginCoin",
          "size",
          "tradeSide",
          "orderType",
          "presetStopSurplusPrice",
          "presetStopLossPrice"
        ],
        strict: true,
        additionalProperties: false
      },
      "strict": true
    }
  },
  {
    "type": "function",
    "function": {
      "name": "close",
      "description": "只有传达给时交易账户操作员(代号：d)有效，代表你要平仓，平仓只用此方法！",
      "parameters": {
        "type": "object",
        "properties": {
          "symbol": {
            "type": "string",
            "description": "交易对"
          },
          "holdSide": {
            "type": "string",
            "description": "持仓方向",
            "enum": [
              "long",
              "short"
            ],
          },
        },
        "required": [
          "symbol",
          "holdSide",
        ],
        strict: true,
        additionalProperties: false
      },
      "strict": true
    }
  },
  {
    "type": "function",
    "function": {
      "name": "leverage",
      "description": "只有传达给时交易账户操作员(代号：d)有效，代表你要调整杠杆",
      "parameters": {
        "type": "object",
        "properties": {
          "symbol": {
            "type": "string",
            "description": "交易对"
          },
          "leverage": {
            "type": "string",
            "description": "杠杆倍数"
          },
          "holdSide": {
            "type": "string",
            "description": "持仓方向",
            "enum": [
              "long",
              "short"
            ],
          },
        },
        "required": [
          "symbol",
          "holdSide",
        ],
        strict: true,
        additionalProperties: false
      },
      "strict": true
    }
  },
];