import allLogsReducer from "./allLogs";
import cctvsModalReducer from "./cctvsModal";
import cctvsReducer from "./cctvs";
import cctvsTableEventReducer from "./cctvsTableEvent";
import cdrCenterReducer from "./cdrCenter";
import { combineReducers } from "redux";
import loginReducer from "./login";
import mapboxCategoryReducer from "./mapboxCategory";
import mapboxEventReducer from "./mapboxEvent";
import mapboxReducer from "./mapbox";
import recentLogsReducer from "./recentLogs";
import searchCenterReducer from "./searchCenterModal";
import settingsReducer from "./settings";

// 여러 개의 리듀서를 통합
const rootReducers = combineReducers({
  mapboxReducer,
  mapboxEventReducer,
  mapboxCategoryReducer,
  cdrCenterReducer,
  cctvsReducer,
  cctvsModalReducer,
  cctvsTableEventReducer,
  searchCenterReducer,
  allLogsReducer,
  recentLogsReducer,
  loginReducer,
  settingsReducer,
});

export default rootReducers;
