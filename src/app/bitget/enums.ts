export type URL2ITEMKEY = '/api/v2/mix/order/cancel-order' | '/api/v2/mix/account/set-leverage' | '/api/v2/mix/order/place-order' | '/api/v2/mix/order/close-positions'

export const URL2ITEM:Record<URL2ITEMKEY,keyof AIRes> = {
  "/api/v2/mix/order/cancel-order":'cancelOrder',
  "/api/v2/mix/account/set-leverage":'leverage',
  "/api/v2/mix/order/place-order":'deal',
  "/api/v2/mix/order/close-positions":'close',
}