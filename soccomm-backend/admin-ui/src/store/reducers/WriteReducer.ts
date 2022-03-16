import { Action } from "redux";
import WriteAction from "../actions/WriteAction";

interface IAction extends Action {
  a: number;
}

function WriteReducer(store: number = 0, action: IAction): any {
  switch (action.type) {
    case WriteAction.ActionTypes.WRITE:
      return action.a;
    default:
      //return current_store_data;
      return store;
  }
}
export default WriteReducer;
