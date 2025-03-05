import { Routes, createRoute } from "../utils/route";
import { getFeat } from "./getFeat";
import {getSpotList} from "./getSpotList";

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