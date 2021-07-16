import cctvsModalReducer from "./cctvsModal";
import cctvsReducer from "./cctvs";
import cctvsTableEventReducer from "./cctvsTableEvent";
import cdrCenterReducer from "./cdrCenter";
import { combineReducers } from "redux";
import logsReducer from "./logs";
import mapboxCategoryReducer from "./mapboxCategory";
import mapboxEventReducer from "./mapboxEvent";
import mapboxReducer from "./mapbox";
import searchCenterReducer from "./searchCenterModal";

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
  logsReducer,
});

export default rootReducers;
