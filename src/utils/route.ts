
import express from 'express'

export interface Routes {
  path:string
  route?:express.Router
  children?:Routes[]
}

let router:Routes[] = []
// 扁平化路由
export function createRoute(routes:Routes[],parentPath?:string) {
  
  for (const item of routes) {
    if (parentPath) item.path = parentPath + item.path
    if (item.children) {
      router.push(item)
      return createRoute(item.children,item.path)
    }
    router.push(item)
  }
  return router
}