import { combineReducers } from "redux";
import leftSideNavReducer from "./left-side-nav/leftSideNavReducer";
import rightSideNavReducer from "./right-side-nav/rightSideNavReducer";

const rootReducer = combineReducers({
  sideNavLeft: leftSideNavReducer,
  sideNavRight: rightSideNavReducer,
});

export default rootReducer;
