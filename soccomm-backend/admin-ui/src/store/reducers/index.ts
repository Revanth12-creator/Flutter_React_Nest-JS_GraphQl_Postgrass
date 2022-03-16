import { combineReducers } from "redux";
import { StoreType } from "../../types";
import writeReducer from "./WriteReducer";

const rootReducer = combineReducers<StoreType>({
  a: writeReducer,
});

export default rootReducer;
