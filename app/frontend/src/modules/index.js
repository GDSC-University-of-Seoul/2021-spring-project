import cctvsReducer from "./cctvs";
import cdrCenterReducer from "./cdrCenter";
import { combineReducers } from "redux";
import mapboxCategoryReducer from "./mapboxCategory";
import mapboxEventReducer from "./mapboxEvent";
import mapboxReducer from "./mapbox";

// 여러 개의 리듀서를 통합
const rootReducers = combineReducers({
  mapboxReducer,
  mapboxEventReducer,
  mapboxCategoryReducer,
  cdrCenterReducer,
  cctvsReducer,
});

export default rootReducers;
