import { Routes, createRoute } from "../utils/route";
import { getSpotList,getFeat } from "@/route/bitgetAPI/index";

const routes: Routes[] = [
  {
    path:'/getSpotList',
    route:getSpotList
  },
  {
    path:'/getFeat',
    route:getFeat
  }
];

export default createRoute(routes);