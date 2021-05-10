import { combineReducers } from "redux";
import mapboxReducer from "./mapbox";

const rootReducers = combineReducers({ mapboxReducer });

export default rootReducers;
